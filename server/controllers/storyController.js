const Story = require("../models/Story");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// ✅ Safe socket import
let userSockets = null;
try {
  const socketModule = require("../socket");
  userSockets = socketModule.userSockets;
} catch (e) {
  console.log("⚠️ Socket module not available, skipping socket notifications");
}

// @desc    Create a story
// @route   POST /api/stories
// @access  Private
const createStory = async (req, res) => {
  try {
    const { caption, mediaType = "image" } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a media file",
      });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "socially/stories",
          resource_type: "auto",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const story = await Story.create({
      user: req.user._id,
      media: result.secure_url,
      type: mediaType,
      caption: caption || "",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const populatedStory = await Story.findById(story._id).populate(
      "user",
      "name avatar",
    );

    res.status(201).json({
      success: true,
      message: "Story created successfully",
      data: populatedStory,
    });
  } catch (error) {
    console.error("Create Story Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create story",
    });
  }
};

// @desc    Get all active stories (for feed)
// @route   GET /api/stories
// @access  Private
const getStories = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Get stories that are not expired
    const stories = await Story.find({
      expiresAt: { $gt: new Date() },
      isActive: true,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    // Group stories by user
    const groupedStories = {};

    stories.forEach((story) => {
      const userId = story.user._id.toString();
      if (!groupedStories[userId]) {
        groupedStories[userId] = {
          user: story.user,
          stories: [],
        };
      }
      // Check if current user has viewed this story
      const hasViewed = story.viewers.some(
        (v) => v.user.toString() === currentUserId.toString(),
      );
      groupedStories[userId].stories.push({
        ...story.toObject(),
        viewed: hasViewed,
      });
    });

    const result = Object.values(groupedStories);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get Stories Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch stories",
    });
  }
};

// @desc    Get a single story
// @route   GET /api/stories/:id
// @access  Private
const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate("user", "name avatar")
      .populate("viewers.user", "name avatar")
      .populate("replies.user", "name avatar"); // ✅ Populate replies

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error("Get Story Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch story",
    });
  }
};

// @desc    View a story (add viewer)
// @route   PUT /api/stories/:id/view
// @access  Private
const viewStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    // Check if user already viewed
    const alreadyViewed = story.viewers.some(
      (v) => v.user.toString() === req.user._id.toString(),
    );

    if (!alreadyViewed) {
      story.viewers.push({ user: req.user._id });
      await story.save();
    }

    const updatedStory = await Story.findById(story._id)
      .populate("user", "name avatar")
      .populate("viewers.user", "name avatar");

    res.status(200).json({
      success: true,
      data: updatedStory,
    });
  } catch (error) {
    console.error("View Story Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to view story",
    });
  }
};

// @desc    Delete a story
// @route   DELETE /api/stories/:id
// @access  Private
const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    // Check ownership
    if (story.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own stories",
      });
    }

    await story.deleteOne();

    res.status(200).json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Delete Story Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete story",
    });
  }
};

// @desc    Delete expired stories (cron job)
// @route   DELETE /api/stories/cleanup
// @access  Private (Admin only)
const cleanupExpiredStories = async (req, res) => {
  try {
    const result = await Story.deleteMany({
      expiresAt: { $lt: new Date() },
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} expired stories deleted`,
    });
  } catch (error) {
    console.error("Cleanup Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to cleanup stories",
    });
  }
};

// @desc    Reply to a story
// @route   POST /api/stories/:id/reply
// @access  Private
const replyToStory = async (req, res) => {
  try {
    const { text } = req.body;
    const storyId = req.params.id;
    const userId = req.user._id;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply text is required",
      });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    // ✅ Add reply to story
    story.replies.push({
      user: userId,
      text: text.trim(),
      createdAt: new Date(),
    });

    await story.save();

    // Populate reply user details
    const populatedStory = await Story.findById(storyId)
      .populate("user", "name avatar")
      .populate("replies.user", "name avatar");

    // ✅ Notify story owner via socket
    try {
      if (userSockets) {
        const ownerSocketId = userSockets.get(story.user.toString());
        if (ownerSocketId) {
          const io = req.app.get("io");
          if (io) {
            io.to(ownerSocketId).emit("story-reply", {
              storyId: story._id,
              reply: populatedStory.replies[populatedStory.replies.length - 1],
            });
          }
        }
      }
    } catch (socketError) {
      console.log("Socket notification skipped:", socketError.message);
    }

    res.status(201).json({
      success: true,
      message: "Reply sent successfully",
      data: populatedStory,
    });
  } catch (error) {
    console.error("Reply to story error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send reply",
    });
  }
};

// @desc    Get replies for a story
// @route   GET /api/stories/:id/replies
// @access  Private
const getStoryReplies = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate(
      "replies.user",
      "name avatar",
    );

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      data: story.replies || [],
    });
  } catch (error) {
    console.error("Get replies error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get replies",
    });
  }
};

module.exports = {
  createStory,
  getStories,
  getStory,
  viewStory,
  deleteStory,
  cleanupExpiredStories,
  replyToStory,
  getStoryReplies,
};

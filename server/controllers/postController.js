const Post = require("../models/Post");
const User = require("../models/User");
const { createPostNotifications } = require("./notificationController");

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { content, image, isPublic } = req.body;

    if (!content && !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide content or an image",
      });
    }

    const post = await Post.create({
      user: req.user._id,
      content,
      image,
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    const populatedPost = await Post.findById(post._id)
      .populate("user", "name email avatar username")
      .populate("comments.user", "name email avatar");

    // ✅ Create notifications for followers (in background)
    try {
      const author = req.user;
      const followers = author.followers || [];

      // Get Socket.IO instance from app
      const io = req.app.get("io");

      // Create notifications in background (don't await to avoid blocking response)
      createPostNotifications(populatedPost, author, followers, io)
        .then(() => {
          console.log(
            `📢 Notifications created for ${followers.length} followers`,
          );
        })
        .catch((err) => {
          console.error("Failed to create notifications:", err);
        });
    } catch (notificationError) {
      // Don't fail the post creation if notifications fail
      console.error("Notification creation error:", notificationError);
    }

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: populatedPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create post",
    });
  }
};

// @desc    Get all posts (feed)
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isPublic: true })
      .populate("user", "name email avatar")
      .populate("comments.user", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch posts",
    });
  }
};

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Private
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name email avatar")
      .populate("comments.user", "name email avatar");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Get Post Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch post",
    });
  }
};

// @desc    Like/Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "name email avatar")
      .populate("comments.user", "name email avatar");

    res.status(200).json({
      success: true,
      message: isLiked ? "Post unliked" : "Post liked",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle like",
    });
  }
};

// @desc    Add a comment
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = {
      user: req.user._id,
      text: text.trim(),
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "name email avatar")
      .populate("comments.user", "name email avatar");

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add comment",
    });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === req.params.commentId,
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if user owns the comment
    if (
      post.comments[commentIndex].user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment",
      });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "name email avatar")
      .populate("comments.user", "name email avatar");

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete comment",
    });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete post",
    });
  }
};

// @desc    Save/Unsave a post
// @route   PUT /api/posts/:id/save
// @access  Private
const toggleSave = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isSaved = user.savedPosts.includes(post._id);

    if (isSaved) {
      // Remove from saved posts
      user.savedPosts = user.savedPosts.filter(
        (id) => id.toString() !== post._id.toString(),
      );
    } else {
      // Add to saved posts
      user.savedPosts.push(post._id);
    }

    await user.save();

    // Return updated post with populated data
    const updatedPost = await Post.findById(post._id)
      .populate("user", "name email avatar")
      .populate("comments.user", "name email avatar");

    res.status(200).json({
      success: true,
      message: isSaved ? "Post unsaved" : "Post saved",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Toggle Save Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle save",
    });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { content, image, isPublic } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own posts",
      });
    }

    // Update fields if provided
    if (content !== undefined) post.content = content;
    if (image !== undefined) post.image = image;
    if (isPublic !== undefined) post.isPublic = isPublic;

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "name email avatar")
      .populate("comments.user", "name email avatar");

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update post",
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  toggleLike,
  addComment,
  deleteComment,
  deletePost,
  toggleSave,
  updatePost,
};

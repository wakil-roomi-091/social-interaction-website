const User = require("../models/User");
const Post = require("../models/Post");
// ❌ Removed: const Community = require("../models/Community");

// @desc    Global search
// @route   GET /api/search
// @access  Private
const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    const searchTerm = q.trim();
    const regex = new RegExp(searchTerm, "i");

    // Search Users
    const users = await User.find({
      $or: [{ name: regex }, { username: regex }, { email: regex }],
    })
      .select("name username email avatar bio")
      .limit(5);

    // Search Posts
    const posts = await Post.find({
      content: regex,
      isPublic: true,
    })
      .populate("user", "name avatar")
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        users,
        posts,
        // ❌ Removed: communities,
      },
    });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search",
    });
  }
};

// @desc    Search users only
// @route   GET /api/search/users
// @access  Private
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    const regex = new RegExp(q.trim(), "i");
    const users = await User.find({
      $or: [{ name: regex }, { username: regex }, { email: regex }],
    })
      .select("name username email avatar bio")
      .limit(20);

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search users",
    });
  }
};

// @desc    Search posts only
// @route   GET /api/search/posts
// @access  Private
const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    const regex = new RegExp(q.trim(), "i");
    const posts = await Post.find({
      content: regex,
      isPublic: true,
    })
      .populate("user", "name avatar")
      .limit(20);

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search posts",
    });
  }
};

// @desc    Search communities only (placeholder - returns empty)
// @route   GET /api/search/communities
// @access  Private
const searchCommunities = async (req, res) => {
  try {
    // Communities feature not implemented yet
    res.status(200).json({
      success: true,
      data: [],
      message: "Communities search coming soon",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search communities",
    });
  }
};

module.exports = {
  search,
  searchUsers,
  searchPosts,
  searchCommunities,
};

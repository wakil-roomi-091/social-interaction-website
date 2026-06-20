const User = require("../models/User");

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user",
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get Me Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user",
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateMe = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();

    // ✅ Get updated user WITHOUT password
    const updatedUser = await User.findById(req.user._id).select("-password");

    // ✅ DO NOT generate a new token here
    // ✅ DO NOT invalidate the existing token

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Private
const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if trying to follow self
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    // Check if already following
    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    // Add to following/followers
    currentUser.following.push(req.params.id);
    userToFollow.followers.push(req.user._id);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: `You are now following ${userToFollow.name}`,
      data: {
        following: currentUser.following,
        followers: userToFollow.followers,
      },
    });
  } catch (error) {
    console.error("Follow User Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to follow user",
    });
  }
};

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Private
const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if not following
    if (!currentUser.following.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }

    // Remove from following/followers
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== req.params.id,
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.user._id.toString(),
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({
      success: true,
      message: `You have unfollowed ${userToUnfollow.name}`,
      data: {
        following: currentUser.following,
        followers: userToUnfollow.followers,
      },
    });
  } catch (error) {
    console.error("Unfollow User Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to unfollow user",
    });
  }
};

// @desc    Check if following a user
// @route   GET /api/users/:id/is-following
// @access  Private
const isFollowing = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const isFollowing = currentUser.following.includes(req.params.id);

    res.status(200).json({
      success: true,
      data: { isFollowing },
    });
  } catch (error) {
    console.error("Is Following Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to check follow status",
    });
  }
};

module.exports = {
  getUser,
  getMe,
  updateMe,
  followUser,
  unfollowUser,
  isFollowing,
};

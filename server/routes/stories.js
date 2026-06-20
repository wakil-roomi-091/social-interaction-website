const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { uploadSingle } = require("../middleware/upload");
const {
  createStory,
  getStories,
  getStory,
  viewStory,
  deleteStory,
  cleanupExpiredStories,
  replyToStory,      // ✅ ADD
  getStoryReplies,   // ✅ ADD
} = require("../controllers/storyController");

// All routes require authentication
router.use(protect);

// Get all stories
router.get("/", getStories);

// Create a story
router.post("/", uploadSingle, createStory);

// View a story (mark as viewed)
router.put("/:id/view", viewStory);

// Get a single story
router.get("/:id", getStory);

// Delete a story
router.delete("/:id", deleteStory);

// ✅ Reply to a story
router.post("/:id/reply", replyToStory);

// ✅ Get story replies
router.get("/:id/replies", getStoryReplies);

// Cleanup expired stories
router.delete("/cleanup", cleanupExpiredStories);

module.exports = router;
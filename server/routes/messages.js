const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getOrCreateConversation,
  getConversations,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");

// All routes require authentication
router.use(protect);

// Get all conversations
router.get("/conversations", getConversations);

// Get or create conversation
router.post("/conversation", getOrCreateConversation);

// Get messages for a conversation
router.get("/:conversationId", getMessages);

// Delete a message
router.delete("/:messageId", deleteMessage);

module.exports = router;

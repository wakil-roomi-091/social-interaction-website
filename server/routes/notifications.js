const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

// ✅ TEST ROUTE - Add this temporarily
router.post("/test", async (req, res) => {
  try {
    const Notification = require("../models/Notification");
    const notification = await Notification.create({
      recipient: req.user._id,
      sender: req.user._id,
      type: "new_post",
      message: "Test notification",
    });
    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Test route error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/notifications - Get all notifications
router.get("/", async (req, res) => {
  try {
    const Notification = require("../models/Notification");
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .populate("sender", "name email avatar username")
      .populate("post", "content image _id")
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch notifications",
    });
  }
});

// GET /api/notifications/unread-count - Get unread count
router.get("/unread-count", async (req, res) => {
  try {
    const Notification = require("../models/Notification");
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Get Unread Count Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get unread count",
    });
  }
});

// PUT /api/notifications/:id/read - Mark as read
router.put("/:id/read", async (req, res) => {
  try {
    const Notification = require("../models/Notification");
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    console.error("Mark as Read Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to mark notification as read",
    });
  }
});

// PUT /api/notifications/read-all - Mark all as read
router.put("/read-all", async (req, res) => {
  try {
    const Notification = require("../models/Notification");
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true },
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark All as Read Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to mark all notifications as read",
    });
  }
});

// DELETE /api/notifications/:id - Delete notification
router.delete("/:id", async (req, res) => {
  try {
    const Notification = require("../models/Notification");
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete notification",
    });
  }
});

module.exports = router;

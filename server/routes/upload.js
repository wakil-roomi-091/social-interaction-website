const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { uploadSingle, uploadMultiple } = require("../middleware/upload");
const {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
} = require("../controllers/uploadController");

// All upload routes require authentication
router.use(protect);

// Single image upload
router.post("/image", uploadSingle, uploadImage);

// Multiple images upload
router.post("/images", uploadMultiple, uploadMultipleImages);

// Delete image
router.delete("/image", deleteImage);

module.exports = router;

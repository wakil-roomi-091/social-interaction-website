const multer = require("multer");
const path = require("path");

// Configure multer for memory storage
const storage = multer.memoryStorage();

// ✅ File filter - Allow images AND videos
const fileFilter = (req, file, cb) => {
  // Allowed extensions - images and videos
  const allowedTypes =
    /jpeg|jpg|png|gif|webp|mp4|mov|avi|mkv|webm|svg|bmp|tiff/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"));
  }
};

// Multer upload configuration - NO FILE SIZE LIMIT
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // ❌ Removed limits: fileSize
});

// Single file upload
const uploadSingle = upload.single("image");

// Multiple files upload (max 10)
const uploadMultiple = upload.array("images", 10);

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
};

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Upload single image/video to Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No media file provided",
      });
    }

    console.log(
      "📤 Uploading media:",
      req.file.originalname,
      req.file.mimetype,
    );

    // ✅ Determine if it's a video or image
    const isVideo = req.file.mimetype.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    // Upload to Cloudinary using stream
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "socially/posts",
          resource_type: resourceType,
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

    console.log("✅ Upload successful:", result.secure_url);

    res.status(200).json({
      success: true,
      message: "Media uploaded successfully",
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        type: resourceType,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload media",
    });
  }
};

// Upload multiple images/videos
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No media files provided",
      });
    }

    const uploadPromises = req.files.map((file) => {
      const isVideo = file.mimetype.startsWith("video/");
      const resourceType = isVideo ? "video" : "image";

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "socially/posts",
            resource_type: resourceType,
            quality: "auto",
            fetch_format: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const results = await Promise.all(uploadPromises);
    const mediaUrls = results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    res.status(200).json({
      success: true,
      message: "Media uploaded successfully",
      data: {
        urls: mediaUrls,
        count: mediaUrls.length,
      },
    });
  } catch (error) {
    console.error("Upload Multiple Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload media",
    });
  }
};

// Delete media from Cloudinary
const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "Public ID is required",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: "Media deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Delete Media Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete media",
    });
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
};

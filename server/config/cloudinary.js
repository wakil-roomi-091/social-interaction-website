const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "datont7yq",
  api_key: process.env.CLOUDINARY_API_KEY || "916423486646274",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "HlnFAz3PFpa_GdZJuweU_RKEOUE",
});

module.exports = cloudinary;

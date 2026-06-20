const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  search,
  searchUsers,
  searchPosts,
  searchCommunities,
} = require("../controllers/searchController");

// All search routes require authentication
router.use(protect);

// Global search
router.get("/", search);

// Specific searches
router.get("/users", searchUsers);
router.get("/posts", searchPosts);
router.get("/communities", searchCommunities);

module.exports = router;

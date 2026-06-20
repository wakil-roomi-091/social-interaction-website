const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createPost,
  getPosts,
  getPost,
  toggleLike,
  addComment,
  deleteComment,
  deletePost,
  toggleSave,
  updatePost,
} = require("../controllers/postController");

// ✅ All routes are protected (require authentication)
router.use(protect);

// ✅ Posts routes
router.route("/").get(getPosts).post(createPost);

router.route("/:id").get(getPost);

// ✅ Delete post route
router.delete("/:id", deletePost);

// ✅ Like route
router.put("/:id/like", toggleLike);

// ✅ Save route - NEW
router.put("/:id/save", toggleSave);

// ✅ Update post route
router.put("/:id", updatePost);

// ✅ Comment routes
router.post("/:id/comments", addComment);
router.delete("/:postId/comments/:commentId", deleteComment);

module.exports = router;

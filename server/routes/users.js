const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUser,
  getMe,
  updateMe,
  followUser,    // ✅ New
  unfollowUser,  // ✅ New
  isFollowing,   // ✅ New
} = require('../controllers/userController');

// All routes are protected
router.use(protect);

router.get('/me', getMe);
router.put('/me', updateMe);
router.get('/:id', getUser);
router.get('/:id/is-following', isFollowing);  // ✅ New
router.put('/:id/follow', followUser);          // ✅ New
router.put('/:id/unfollow', unfollowUser);      // ✅ New

module.exports = router;
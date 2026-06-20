import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Edit2,
  Trash2,
  Flag,
  Share2,
  Loader2,
  Check,
  Send,
  Bookmark
} from 'lucide-react';
import { postsAPI } from '../../services/api';
import toast from 'react-hot-toast';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import ImageLightbox from '../common/ImageLightbox';

const ProfilePostCard = ({ post, user, onPostUpdate, onSaveUpdate }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false); // ✅ ADDED
  const [comments, setComments] = useState(post.comments || []);
  const [liked, setLiked] = useState(
    post.likes?.some(id => id === JSON.parse(localStorage.getItem('user') || '{}')?._id)
  );
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const menuRef = useRef(null);
  const commentInputRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isOwnPost = post.user?._id === currentUser?._id;

  // Check if post is saved
  const [isSaved, setIsSaved] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.savedPosts?.includes(post._id) || false;
  });
  const [isSaving, setIsSaving] = useState(false);

  // Update saved status when post changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsSaved(user.savedPosts?.includes(post._id) || false);
  }, [post._id]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus comment input when comments open
  useEffect(() => {
    if (showComments && commentInputRef.current) {
      setTimeout(() => commentInputRef.current.focus(), 100);
    }
  }, [showComments]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount(wasLiked ? likesCount - 1 : likesCount + 1);

    try {
      const response = await postsAPI.toggleLike(post._id);
      const updatedPost = response.data.data;
      setLiked(updatedPost.likes.includes(currentUser?._id));
      setLikesCount(updatedPost.likes.length);
    } catch (error) {
      setLiked(wasLiked);
      setLikesCount(wasLiked ? likesCount + 1 : likesCount - 1);
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  const handleToggleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const wasSaved = isSaved;
    setIsSaved(!wasSaved);

    try {
      const response = await postsAPI.toggleSave(post._id);
      const updatedPost = response.data.data;

      const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (wasSaved) {
        updatedUser.savedPosts = updatedUser.savedPosts?.filter(id => id !== post._id) || [];
      } else {
        if (!updatedUser.savedPosts) updatedUser.savedPosts = [];
        updatedUser.savedPosts.push(post._id);
      }
      localStorage.setItem('user', JSON.stringify(updatedUser));

      onSaveUpdate?.(post._id, updatedPost);
      toast.success(wasSaved ? 'Post removed from saved' : 'Post saved!');
    } catch (error) {
      setIsSaved(wasSaved);
      toast.error(error.response?.data?.message || 'Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setIsCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = postUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setIsCopied(false), 3000);
      } catch (err) {
        toast.error('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isCommenting) return;

    setIsCommenting(true);
    const commentText = newComment.trim();
    setNewComment('');

    const tempComment = {
      _id: Date.now().toString(),
      user: {
        _id: currentUser._id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      text: commentText,
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [...prev, tempComment]);

    try {
      const response = await postsAPI.addComment(post._id, commentText);
      const updatedPost = response.data.data;
      setComments(updatedPost.comments || []);
      toast.success('Comment added!');
    } catch (error) {
      setComments(prev => prev.filter(c => c._id !== tempComment._id));
      toast.error('Failed to add comment');
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await postsAPI.delete(post._id);
      toast.success('Post deleted successfully');
      onPostUpdate?.(post._id);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    toast.info('Edit feature coming soon');
  };

  const handleReport = () => {
    setIsMenuOpen(false);
    toast.info('Report feature coming soon');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const menuOptions = [
    ...(isOwnPost ? [
      { icon: Edit2, label: 'Edit post', action: handleEdit },
      { icon: Trash2, label: 'Delete post', action: handleDeleteClick },
    ] : []),
    { icon: Flag, label: 'Report', action: handleReport },
  ];

  return (
    <>
      <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg overflow-hidden">
        {/* Post Header */}
        <div className="p-4 flex items-center gap-3 relative">
          <button
            onClick={() => navigate(`/profile/${user?._id}`)}
            className="flex-shrink-0 cursor-pointer"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
              alt=""
              className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-rust/50 transition-all"
            />
          </button>
          <div className="flex-1">
            <button
              onClick={() => navigate(`/profile/${user?._id}`)}
              className="text-sm font-bold text-ink hover:text-rust transition-colors cursor-pointer"
            >
              {user?.name || 'User'}
            </button>
            <div className="text-xs text-ink-soft">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>

          {/* Three dots menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-full hover:bg-cream-deep transition-colors text-ink-soft hover:text-ink"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-paper border border-[#1C1B19]/[0.08] rounded-lg shadow-[0_16px_40px_-10px_rgba(28,27,25,0.2)] py-1 z-10 animate-in fade-in slide-in-from-top-1 duration-150">
                {menuOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.action}
                    disabled={isDeleting}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft hover:bg-cream-deep hover:text-ink transition-colors disabled:opacity-50"
                  >
                    <option.icon className="w-4 h-4" />
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        {post.content && (
          <div className="px-4 pb-3 text-sm text-ink-soft leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </div>
        )}

        {/* ✅ Post Image - Fixed */}
        {post.image && (
          <div
            className="w-full bg-cream-deep/30 cursor-pointer overflow-hidden"
            onClick={() => setShowLightbox(true)}
          >
            <img
              src={post.image}
              alt="Post"
              className="w-full h-auto max-h-[600px] object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="px-4 py-3 flex gap-6 text-sm font-semibold border-t border-[#1C1B19]/[0.06]">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${liked ? 'text-rust scale-105' : 'text-ink-soft hover:text-rust hover:scale-105'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLiking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Heart className={`w-4 h-4 transition-all duration-200 ${liked ? 'fill-current scale-110' : 'scale-100'}`} />
            )}
            {likesCount}
          </button>

          <button
            onClick={toggleComments}
            className="flex items-center gap-1.5 cursor-pointer text-ink-soft hover:text-ink transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {comments.length}
          </button>

          {/* Save Button */}
          <button
            onClick={handleToggleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin text-ink-soft" />
            ) : (
              <Bookmark className={`w-4 h-4 transition-all duration-200 ${isSaved ? 'fill-current text-moss' : 'text-ink-soft hover:text-moss'
                }`} />
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 cursor-pointer text-ink-soft hover:text-ink transition-colors ml-auto"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-moss" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            {isCopied ? 'Copied!' : 'Share'}
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-[#1C1B19]/[0.06] px-4 py-3">
            {/* Comments List */}
            <div className="space-y-3 max-h-[200px] overflow-y-auto mb-3">
              {comments.length === 0 ? (
                <p className="text-sm text-ink-soft text-center py-2">No comments yet</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="flex gap-3">
                    <img
                      src={comment.user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-ink">{comment.user?.name || 'User'}</div>
                      <p className="text-sm text-ink-soft">{comment.text}</p>
                      <div className="text-[10px] text-ink-soft mt-0.5">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                ref={commentInputRef}
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 rounded-pill bg-cream-deep text-sm outline-none focus:ring-2 focus:ring-moss/30 placeholder:text-ink-soft"
              />
              <button
                type="submit"
                disabled={isCommenting || !newComment.trim()}
                className="w-9 h-9 rounded-full bg-moss text-cream flex items-center justify-center hover:bg-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isCommenting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Post"
          message="This action cannot be undone. This post will be permanently deleted from your profile and feed."
        />
      </div>

      {/* ✅ Image Lightbox - ADDED */}
      <ImageLightbox
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        images={[post.image]}
        currentIndex={0}
        alt="Post image"
      />
    </>
  );
};

export default ProfilePostCard;
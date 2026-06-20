import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { postsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const CommentSection = ({ postId, comments: initialComments, isOpen, onClose, onCommentAdded }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const response = await postsAPI.addComment(postId, newComment);
            const updatedPost = response.data.data;

            setComments(updatedPost.comments || []);
            setNewComment('');
            onCommentAdded?.(updatedPost);
            toast.success('Comment added!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add comment');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-paper rounded-2xl w-full max-w-[500px] max-h-[80vh] overflow-hidden shadow-[0_40px_80px_-30px_rgba(28,27,25,0.3)] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1B19]/[0.08]">
                    <h3 className="font-display text-lg font-semibold text-ink">Comments</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-cream-deep flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-ink-soft" />
                    </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {comments.length === 0 ? (
                        <p className="text-center text-ink-soft text-sm py-8">No comments yet. Be the first!</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment._id} className="flex gap-3">
                                <img
                                    src={comment.user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
                                    alt=""
                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                />
                                <div>
                                    <div className="text-sm font-bold text-ink">{comment.user?.name || 'User'}</div>
                                    <p className="text-sm text-ink-soft">{comment.text}</p>
                                    <div className="text-[10px] text-ink-soft mt-0.5">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-[#1C1B19]/[0.08] flex gap-2">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2.5 rounded-pill bg-cream-deep text-sm outline-none focus:ring-2 focus:ring-moss/30 placeholder:text-ink-soft"
                    />
                    <button
                        type="submit"
                        disabled={loading || !newComment.trim()}
                        className="w-10 h-10 rounded-full bg-moss text-cream flex items-center justify-center hover:bg-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentSection;
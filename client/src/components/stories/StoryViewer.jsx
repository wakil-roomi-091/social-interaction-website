import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2, Eye, MoreHorizontal, Trash2, Send, Smile } from 'lucide-react';
import { storyAPI } from '../../services/api';
import { getSocket } from '../../services/socket';
import toast from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';

const StoryViewer = ({ isOpen, onClose, stories, currentIndex: initialIndex = 0, currentUser, onStoryDeleted }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewedStories, setViewedStories] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [showViewers, setShowViewers] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [storyViewers, setStoryViewers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [isPausedManually, setIsPausedManually] = useState(false);
    const progressTimerRef = useRef(null);
    const videoRef = useRef(null);
    const menuRef = useRef(null);
    const replyInputRef = useRef(null);

    const currentStory = stories?.[currentIndex];
    const totalStories = stories?.length || 0;

    // Check if current user is the story owner
    const isOwnStory = currentStory?.user?._id === currentUser?._id;

    // Load story viewers
    useEffect(() => {
        if (currentStory?.viewers && isOwnStory) {
            setStoryViewers(currentStory.viewers || []);
        } else {
            setStoryViewers([]);
        }
    }, [currentStory, isOwnStory]);

    // Load replies
    useEffect(() => {
        if (currentStory && isOwnStory) {
            const fetchReplies = async () => {
                try {
                    const response = await storyAPI.getReplies(currentStory._id);
                    setReplies(response.data.data || []);
                } catch (error) {
                    console.error('Fetch replies error:', error);
                }
            };
            fetchReplies();
        } else {
            setReplies([]);
        }
    }, [currentStory, isOwnStory]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Load story content
    useEffect(() => {
        if (!isOpen || !currentStory) {
            return;
        }

        setLoading(true);
        setProgress(0);
        setShowViewers(false);
        setShowReplies(false);
        setIsPausedManually(false);

        if (currentStory.type === 'video' && videoRef.current) {
            const handleCanPlay = () => {
                setLoading(false);
                videoRef.current.play().catch(err => {
                    console.log('Autoplay prevented:', err);
                });
            };
            videoRef.current.addEventListener('canplay', handleCanPlay);

            const timeout = setTimeout(() => {
                setLoading(false);
            }, 3000);

            return () => {
                videoRef.current?.removeEventListener('canplay', handleCanPlay);
                clearTimeout(timeout);
            };
        }

        if (currentStory.type === 'image') {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);

    }, [currentIndex, isOpen]);

    // Progress timer - SYNCED WITH VIDEO
    useEffect(() => {
        if (!isOpen || isPaused || isPausedManually || !currentStory || loading) return;

        if (currentStory.type === 'video' && videoRef.current) {
            const video = videoRef.current;

            const updateProgress = () => {
                if (video && video.duration && !isNaN(video.duration)) {
                    const currentTime = video.currentTime || 0;
                    const duration = video.duration || 1;
                    const progressPercent = (currentTime / duration) * 100;
                    setProgress(Math.min(progressPercent, 100));

                    if (duration - currentTime < 0.3 && !isPaused && !isPausedManually) {
                        handleNext();
                    }
                }
            };

            video.addEventListener('timeupdate', updateProgress);
            progressTimerRef.current = setInterval(updateProgress, 100);

            return () => {
                video.removeEventListener('timeupdate', updateProgress);
                clearInterval(progressTimerRef.current);
            };
        }

        // For images: default 6 seconds
        progressTimerRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimerRef.current);
                    handleNext();
                    return 0;
                }
                return prev + 1;
            });
        }, 60);

        return () => clearInterval(progressTimerRef.current);
    }, [currentIndex, isOpen, isPaused, isPausedManually, loading]);

    // Mark story as viewed
    useEffect(() => {
        if (currentStory && !viewedStories.includes(currentStory._id)) {
            const markViewed = async () => {
                try {
                    const response = await storyAPI.view(currentStory._id);
                    setViewedStories(prev => [...prev, currentStory._id]);
                    if (response.data.data?.viewers && isOwnStory) {
                        setStoryViewers(response.data.data.viewers);
                    }
                } catch (error) {
                    console.error('Error marking story viewed:', error);
                }
            };
            markViewed();
        }
    }, [currentStory]);

    // Socket listeners for real-time replies
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        const handleStoryReply = (data) => {
            if (data.storyId === currentStory?._id) {
                setReplies(prev => [...prev, data.reply]);
                if (isOwnStory) {
                    toast.success(`New reply from ${data.reply.user?.name || 'someone'}`);
                }
            }
        };

        socket.on('story-reply', handleStoryReply);

        return () => {
            socket.off('story-reply', handleStoryReply);
        };
    }, [currentStory, isOwnStory]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === ' ') {
                e.preventDefault();
                handlePauseToggle();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setProgress(0);
            setIsPaused(false);
            setIsPausedManually(false);
            setLoading(true);
        }
    };

    const handleNext = () => {
        if (currentIndex < totalStories - 1) {
            setCurrentIndex(currentIndex + 1);
            setProgress(0);
            setIsPaused(false);
            setIsPausedManually(false);
            setLoading(true);
        } else {
            onClose();
        }
    };

    // ✅ Click to Pause/Resume (works for both images and videos)
    const handlePauseToggle = () => {
        setIsPausedManually(!isPausedManually);

        if (videoRef.current) {
            if (isPausedManually) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    // Delete Story
    const handleDeleteClick = () => {
        setShowMenu(false);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!currentStory) return;

        try {
            await storyAPI.delete(currentStory._id);
            toast.success('Story deleted successfully');
            setShowDeleteModal(false);

            // ✅ Call onStoryDeleted after state updates
            if (onStoryDeleted) {
                setTimeout(() => {
                    onStoryDeleted(currentStory._id);
                }, 0);
            }

            if (totalStories <= 1) {
                onClose();
            } else {
                handleNext();
            }
        } catch (error) {
            console.error('Delete story error:', error);
            toast.error('Failed to delete story');
        }
    };

    // Reply to Story
    const handleReply = async () => {
        if (!replyText.trim() || isReplying) return;
        if (!currentStory) return;

        setIsReplying(true);
        try {
            const response = await storyAPI.reply(currentStory._id, replyText.trim());
            toast.success('Reply sent!');
            setReplyText('');
            setShowEmojiPicker(false);

            // Update replies if owner is viewing
            if (isOwnStory) {
                setReplies(response.data.data.replies || []);
            }
        } catch (error) {
            console.error('Reply error:', error);
            toast.error(error.response?.data?.message || 'Failed to send reply');
        } finally {
            setIsReplying(false);
        }
    };

    const handleEmojiClick = (emojiData) => {
        setReplyText(prev => prev + emojiData.emoji);
        setShowEmojiPicker(false);
        if (replyInputRef.current) {
            replyInputRef.current.focus();
        }
    };

    const toggleViewers = () => {
        setShowViewers(!showViewers);
        setShowMenu(false);
    };

    const toggleReplies = () => {
        setShowReplies(!showReplies);
        setShowMenu(false);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center">
                {/* Close Button - Top Right */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center text-white/80 hover:text-white z-30"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* User Info - Top Left */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
                    <img
                        src={currentStory?.user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
                        alt={currentStory?.user?.name}
                        className="w-10 h-10 rounded-full border-2 border-white/50 object-cover"
                    />
                    <div>
                        <p className="text-white font-semibold text-sm">{currentStory?.user?.name || 'User'}</p>
                        <p className="text-white/50 text-xs">
                            {currentStory?.createdAt ? new Date(currentStory.createdAt).toLocaleDateString() : ''}
                        </p>
                        {isOwnStory && (
                            <div className="flex items-center gap-3 mt-1">
                                <button
                                    onClick={toggleViewers}
                                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{storyViewers.length || 0} views</span>
                                </button>
                                <button
                                    onClick={toggleReplies}
                                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{replies.length || 0} replies</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Three Dots Menu - Top Right (Owner Only) */}
                {isOwnStory && (
                    <div className="absolute top-4 right-14 z-20" ref={menuRef}>
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-paper border border-[#1C1B19]/[0.08] rounded-lg shadow-[0_16px_40px_-10px_rgba(28,27,25,0.2)] py-1 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                                <button
                                    onClick={handleDeleteClick}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rust hover:bg-cream-deep transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Story
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Viewers List */}
                {isOwnStory && showViewers && (
                    <div className="absolute top-24 left-4 w-64 max-h-64 overflow-y-auto bg-black/80 backdrop-blur-sm rounded-xl p-4 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold text-sm">Viewers</h3>
                            <button
                                onClick={() => setShowViewers(false)}
                                className="text-white/60 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        {storyViewers.length === 0 ? (
                            <p className="text-white/40 text-sm text-center py-4">No viewers yet</p>
                        ) : (
                            storyViewers.map((viewer, index) => (
                                <div key={viewer.user?._id || index} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                                    <img
                                        src={viewer.user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
                                        alt={viewer.user?.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-white text-sm font-medium">{viewer.user?.name || 'User'}</p>
                                        <p className="text-white/40 text-xs">
                                            {viewer.viewedAt ? new Date(viewer.viewedAt).toLocaleTimeString() : ''}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ✅ Replies List */}
                {isOwnStory && showReplies && (
                    <div className="absolute top-24 left-4 w-64 max-h-64 overflow-y-auto bg-black/80 backdrop-blur-sm rounded-xl p-4 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold text-sm">Replies</h3>
                            <button
                                onClick={() => setShowReplies(false)}
                                className="text-white/60 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        {replies.length === 0 ? (
                            <p className="text-white/40 text-sm text-center py-4">No replies yet</p>
                        ) : (
                            replies.map((reply, index) => (
                                <div key={reply._id || index} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                                    <img
                                        src={reply.user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
                                        alt={reply.user?.name}
                                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{reply.user?.name || 'User'}</p>
                                        <p className="text-white/80 text-sm break-words">{reply.text}</p>
                                        <p className="text-white/40 text-xs mt-0.5">
                                            {reply.createdAt ? new Date(reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Progress Bar */}
                {totalStories > 1 && (
                    <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-20">
                        {stories.map((_, index) => (
                            <div
                                key={index}
                                className={`flex-1 h-1 rounded-full bg-white/30 overflow-hidden`}
                            >
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-300"
                                    style={{
                                        width: index === currentIndex
                                            ? `${progress}%`
                                            : index < currentIndex
                                                ? '100%'
                                                : '0%'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Navigation - Left/Right Click Areas */}
                {totalStories > 1 && (
                    <>
                        <div
                            className="absolute left-0 top-0 w-1/4 h-full z-10 cursor-pointer flex items-center justify-start px-4"
                            onClick={handlePrevious}
                        >
                            {currentIndex > 0 && (
                                <div className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition-colors flex items-center justify-center text-white/60 hover:text-white">
                                    <ChevronLeft className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                        <div
                            className="absolute right-0 top-0 w-3/4 h-full z-10 cursor-pointer"
                            onClick={handleNext}
                        />
                    </>
                )}

                {/* Story Content */}
                <div
                    className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center z-10 w-full h-full"
                    onClick={handlePauseToggle}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-white/60 animate-spin" />
                        </div>
                    ) : currentStory ? (
                        <>
                            {currentStory.type === 'video' ? (
                                <video
                                    ref={videoRef}
                                    src={currentStory.media}
                                    className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                                    autoPlay
                                    playsInline
                                    onLoadedData={() => setLoading(false)}
                                    onError={() => setLoading(false)}
                                    onEnded={() => {
                                        if (!isPausedManually) {
                                            handleNext();
                                        }
                                    }}
                                />
                            ) : (
                                <img
                                    src={currentStory.media}
                                    alt="Story"
                                    className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                                    loading="lazy"
                                    onLoad={() => setLoading(false)}
                                    onError={() => setLoading(false)}
                                />
                            )}
                        </>
                    ) : (
                        <div className="text-white/60 text-center">
                            <p>No story available</p>
                        </div>
                    )}

                    {/* ✅ Pause Indicator */}
                    {isPausedManually && !loading && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Caption */}
                    {currentStory?.caption && (
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-[80%] bg-black/50 backdrop-blur-sm px-6 py-3 rounded-xl text-white text-center text-sm">
                            {currentStory.caption}
                        </div>
                    )}

                    {/* Reply Section - Bottom */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/10">
                            <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="text-white/50 hover:text-white transition-colors flex-shrink-0"
                            >
                                <Smile className="w-4 h-4" />
                            </button>
                            <input
                                ref={replyInputRef}
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Reply to story..."
                                className="flex-1 bg-transparent text-white text-sm placeholder:text-white/40 outline-none py-1.5"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleReply();
                                }}
                            />
                            {replyText.trim() && (
                                <button
                                    onClick={handleReply}
                                    disabled={isReplying}
                                    className="text-moss hover:text-rust transition-colors disabled:opacity-50 flex-shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
                            <div className="relative">
                                <EmojiPicker
                                    onEmojiClick={handleEmojiClick}
                                    width={320}
                                    height={400}
                                    theme="dark"
                                />
                                <button
                                    onClick={() => setShowEmojiPicker(false)}
                                    className="absolute top-2 right-2 text-white/60 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Story"
                message="This action cannot be undone. This story will be permanently deleted."
            />
        </>
    );
};

export default StoryViewer;
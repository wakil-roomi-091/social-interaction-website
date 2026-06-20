import { useState, useRef, useEffect } from 'react';
import { X, Image, Smile, MapPin, Link2, Loader2, Globe, Lock, User, Send, Video } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import toast from 'react-hot-toast';
import { postsAPI, uploadAPI } from '../../services/api';

const EditPostModal = ({ isOpen, onClose, post, onPostUpdated }) => {
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [existingMediaUrl, setExistingMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('image');
    const [loading, setLoading] = useState(false);
    const [uploadingMedia, setUploadingMedia] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isPublic, setIsPublic] = useState(true);
    const [keepExistingMedia, setKeepExistingMedia] = useState(true);
    const fileInputRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Load post data when modal opens
    useEffect(() => {
        if (isOpen && post) {
            setContent(post.content || '');
            setExistingMediaUrl(post.image || '');
            setKeepExistingMedia(!!post.image);
            setIsPublic(post.isPublic !== undefined ? post.isPublic : true);
            setSelectedFile(null);
            setMediaPreview(null);
            setMediaType('image');
            setUploadProgress(0);
        }
    }, [isOpen, post]);

    const resetForm = () => {
        setContent('');
        setSelectedFile(null);
        setMediaPreview(null);
        setExistingMediaUrl('');
        setKeepExistingMedia(true);
        setMediaType('image');
        setLoading(false);
        setUploadingMedia(false);
        setUploadProgress(0);
        setIsPublic(true);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) {
            toast.error('Please upload an image or video');
            return;
        }

        setSelectedFile(file);
        setMediaType(isImage ? 'image' : 'video');
        setKeepExistingMedia(false); // New file replaces existing

        const reader = new FileReader();
        reader.onloadend = () => {
            setMediaPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeMedia = () => {
        setSelectedFile(null);
        setMediaPreview(null);
        setKeepExistingMedia(false);
        setExistingMediaUrl('');
        setMediaType('image');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const keepExisting = () => {
        setSelectedFile(null);
        setMediaPreview(null);
        setKeepExistingMedia(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isVideo = (url) => {
        if (!url) return false;
        return url.match(/\.(mp4|mov|avi|mkv|webm|wmv)$/i) || url.includes('video');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim() && !selectedFile && !keepExistingMedia) {
            toast.error('Please write something or add media');
            return;
        }

        setLoading(true);
        let mediaUrl = existingMediaUrl;

        // If user wants to remove media entirely
        if (!keepExistingMedia && !selectedFile) {
            mediaUrl = '';
        }

        // If user uploaded a new file
        if (selectedFile) {
            setUploadingMedia(true);
            setUploadProgress(10);
            try {
                const formData = new FormData();
                formData.append('image', selectedFile);

                setUploadProgress(30);
                const response = await uploadAPI.uploadImage(formData);
                setUploadProgress(70);

                if (response.data.success) {
                    mediaUrl = response.data.data.url;
                    setUploadProgress(100);
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error('Upload error:', error);
                toast.error(error.response?.data?.message || 'Failed to upload media');
                setLoading(false);
                setUploadingMedia(false);
                setUploadProgress(0);
                return;
            }
            setUploadingMedia(false);
        }

        try {
            setUploadProgress(90);
            const response = await postsAPI.update(post._id, {
                content: content.trim(),
                image: mediaUrl,
                isPublic: isPublic,
            });

            toast.success('Post updated successfully!');
            onPostUpdated?.(response.data.data);
            resetForm();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update post');
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    if (!isOpen || !post) return null;

    const currentMediaUrl = mediaPreview || (keepExistingMedia ? existingMediaUrl : null);
    const currentMediaType = mediaPreview ? mediaType : (isVideo(existingMediaUrl) ? 'video' : 'image');
    const hasMedia = !!currentMediaUrl;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-paper rounded-2xl w-full max-w-[580px] shadow-[0_40px_80px_-30px_rgba(28,27,25,0.4)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1B19]/[0.06]">
                    <h2 className="font-display text-xl font-semibold text-ink">Edit post</h2>
                    <button
                        onClick={handleClose}
                        className="w-9 h-9 rounded-full hover:bg-cream-deep flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-ink-soft" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* User info */}
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-moss to-moss-light text-cream flex items-center justify-center text-base font-bold flex-shrink-0">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-ink">{user?.name || 'User'}</div>
                            <button
                                type="button"
                                onClick={() => setIsPublic(!isPublic)}
                                className="inline-flex items-center gap-1.5 mt-0.5 text-xs font-medium text-ink-soft hover:text-ink transition-colors bg-cream-deep px-3 py-1 rounded-pill"
                            >
                                {isPublic ? (
                                    <>
                                        <Globe className="w-3.5 h-3.5" />
                                        Public
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-3.5 h-3.5" />
                                        Private
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Textarea */}
                    <TextareaAutosize
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full text-base text-ink placeholder:text-ink-soft/50 bg-transparent resize-none outline-none font-body min-h-[140px] leading-relaxed"
                        maxRows={10}
                        autoFocus
                    />

                    {/* Media Preview */}
                    {hasMedia && (
                        <div className="relative mt-4 rounded-xl overflow-hidden border border-[#1C1B19]/[0.08] bg-cream-deep/30">
                            {currentMediaType === 'image' ? (
                                <img
                                    src={currentMediaUrl}
                                    alt="Post media"
                                    className="w-full max-h-[320px] object-contain"
                                />
                            ) : (
                                <video
                                    src={currentMediaUrl}
                                    className="w-full max-h-[320px] object-contain"
                                    controls
                                />
                            )}
                            {uploadingMedia && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="text-center">
                                        <Loader2 className="w-8 h-8 text-cream animate-spin mx-auto mb-2" />
                                        <p className="text-cream text-sm font-medium">Uploading...</p>
                                        <div className="w-48 h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
                                            <div
                                                className="h-full bg-moss rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!uploadingMedia && (
                                <button
                                    type="button"
                                    onClick={removeMedia}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            {!uploadingMedia && keepExistingMedia && existingMediaUrl && (
                                <div className="absolute bottom-3 left-3 text-xs text-white/70 bg-black/50 px-3 py-1 rounded-pill">
                                    Existing media
                                </div>
                            )}
                        </div>
                    )}

                    {/* Media controls */}
                    {!hasMedia && (
                        <div className="mt-4 text-sm text-ink-soft/50 text-center">
                            No media attached
                        </div>
                    )}

                    {/* Divider */}
                    <div className="mt-5 pt-4 border-t border-[#1C1B19]/[0.06]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-0.5">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadingMedia}
                                    className="p-2.5 rounded-full hover:bg-cream-deep transition-colors text-ink-soft hover:text-moss disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Add image or video"
                                >
                                    <Image className="w-5 h-5" />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                {existingMediaUrl && !selectedFile && (
                                    <button
                                        type="button"
                                        onClick={keepExisting}
                                        className={`p-2.5 rounded-full hover:bg-cream-deep transition-colors text-xs font-medium ${keepExistingMedia ? 'text-moss bg-cream-deep' : 'text-ink-soft'}`}
                                        title="Keep existing media"
                                    >
                                        Keep
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="p-2.5 rounded-full hover:bg-cream-deep transition-colors text-ink-soft hover:text-moss"
                                    title="Add emoji"
                                >
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    className="p-2.5 rounded-full hover:bg-cream-deep transition-colors text-ink-soft hover:text-moss"
                                    title="Add location"
                                >
                                    <MapPin className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    className="p-2.5 rounded-full hover:bg-cream-deep transition-colors text-ink-soft hover:text-moss"
                                    title="Add link"
                                >
                                    <Link2 className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || uploadingMedia || (!content.trim() && !selectedFile && !keepExistingMedia)}
                                className="px-7 py-2.5 rounded-pill bg-ink text-cream text-sm font-semibold hover:bg-rust transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {uploadingMedia ? 'Uploading...' : 'Saving...'}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Save changes
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-ink-soft/50 mt-2 text-center">
                            Upload a new image/video to replace existing media
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;
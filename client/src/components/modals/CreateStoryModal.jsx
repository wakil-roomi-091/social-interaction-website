import { useState, useRef } from 'react';
import { X, Image, Video, Loader2, Camera, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { storyAPI } from '../../services/api';

const CreateStoryModal = ({ isOpen, onClose, onStoryCreated }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [mediaType, setMediaType] = useState('image');
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const resetForm = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setCaption('');
        setMediaType('image');
        setLoading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 10MB for stories)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size must be less than 10MB');
            return;
        }

        // Check file type
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) {
            toast.error('Please upload an image or video');
            return;
        }

        setSelectedFile(file);
        setMediaType(isImage ? 'image' : 'video');

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeFile = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setMediaType('image');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error('Please select an image or video');
            return;
        }

        setLoading(true);
        setUploadProgress(10);

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('mediaType', mediaType);
            formData.append('caption', caption.trim());

            setUploadProgress(30);

            const response = await storyAPI.create(formData);

            setUploadProgress(100);

            toast.success('Story uploaded successfully!');
            onStoryCreated?.(response.data.data);
            resetForm();
            onClose();
        } catch (error) {
            console.error('Story upload error:', error);
            toast.error(error.response?.data?.message || 'Failed to upload story');
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-paper rounded-2xl w-full max-w-[480px] shadow-[0_40px_80px_-30px_rgba(28,27,25,0.4)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1B19]/[0.06]">
                    <h2 className="font-display text-xl font-semibold text-ink">Add Story</h2>
                    <button
                        onClick={handleClose}
                        className="w-9 h-9 rounded-full hover:bg-cream-deep flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-ink-soft" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* File Upload Area */}
                    {!imagePreview ? (
                        <div
                            className="border-2 border-dashed border-[#1C1B19]/[0.15] rounded-xl p-8 text-center cursor-pointer hover:border-moss transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="w-12 h-12 text-ink-soft/40 mx-auto mb-3" />
                            <p className="text-sm font-medium text-ink">Click to upload</p>
                            <p className="text-xs text-ink-soft/60 mt-1">
                                Images or videos (max 10MB)
                            </p>
                            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-ink-soft/40">
                                <span className="flex items-center gap-1">
                                    <Image className="w-4 h-4" /> JPG, PNG, GIF
                                </span>
                                <span className="w-px h-4 bg-[#1C1B19]/[0.08]" />
                                <span className="flex items-center gap-1">
                                    <Video className="w-4 h-4" /> MP4, MOV
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden bg-cream-deep/30">
                            {mediaType === 'image' ? (
                                <img
                                    src={imagePreview}
                                    alt="Story preview"
                                    className="w-full max-h-[320px] object-contain"
                                />
                            ) : (
                                <video
                                    src={imagePreview}
                                    className="w-full max-h-[320px] object-contain"
                                    controls
                                />
                            )}
                            {loading && (
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
                            {!loading && (
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {/* Caption Input */}
                    <div className="mt-4">
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Add a caption (optional)"
                            className="w-full px-4 py-2.5 rounded-xl bg-cream-deep border border-[#1C1B19]/[0.08] focus:border-moss/50 focus:ring-2 focus:ring-moss/20 outline-none text-sm text-ink placeholder:text-ink-soft/50 transition-all duration-200 resize-none"
                            rows={2}
                            maxLength={100}
                            disabled={loading}
                        />
                        <div className="text-xs text-ink-soft/60 text-right mt-1">
                            {caption.length}/100
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C1B19]/[0.06] mt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-5 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink bg-cream-deep hover:bg-cream-deep/70 rounded-pill transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !selectedFile}
                            className="px-6 py-2.5 text-sm font-semibold text-cream bg-gradient-to-r from-moss to-moss-light hover:from-rust hover:to-rust rounded-pill transition-all shadow-[0_8px_0_0_#2D4A33] hover:shadow-[0_8px_0_0_#8B3A1A] active:translate-y-1 active:shadow-[0_4px_0_0_#8B3A1A] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_8px_0_0_#2D4A33] flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Share Story'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStoryModal;
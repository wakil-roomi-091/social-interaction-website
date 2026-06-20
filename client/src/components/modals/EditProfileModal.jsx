import { useState, useRef } from 'react';
import { X, Camera, Loader2, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadAPI } from '../../services/api';

const EditProfileModal = ({ isOpen, onClose, user, onProfileUpdate }) => {
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const fileInputRef = useRef(null);

    const resetForm = () => {
        setName(user?.name || '');
        setBio(user?.bio || '');
        setAvatar(user?.avatar || '');
        setSelectedFile(null);
        setImagePreview(null);
        setLoading(false);
        setUploadingAvatar(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setAvatar(user?.avatar || '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error('Name is required');
            return;
        }

        setLoading(true);
        let avatarUrl = avatar;

        // ✅ Upload new avatar if selected
        if (selectedFile) {
            setUploadingAvatar(true);
            try {
                const formData = new FormData();
                formData.append('image', selectedFile);

                const response = await uploadAPI.uploadImage(formData);
                if (response.data.success) {
                    avatarUrl = response.data.data.url;
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error('Avatar upload error:', error);
                toast.error(error.response?.data?.message || 'Failed to upload avatar');
                setLoading(false);
                setUploadingAvatar(false);
                return;
            }
            setUploadingAvatar(false);
        }

        // ✅ Update profile
        try {
            const response = await fetch('http://localhost:5000/api/users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: name.trim(),
                    bio: bio.trim(),
                    avatar: avatarUrl,
                }),
            });

            const data = await response.json();

            if (data.success) {
                const updatedUser = data.data;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                toast.success('Profile updated successfully!');
                onProfileUpdate?.(updatedUser);
                resetForm();
                onClose();
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
            setUploadingAvatar(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-paper rounded-2xl w-full max-w-[500px] shadow-[0_40px_80px_-30px_rgba(28,27,25,0.4)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1B19]/[0.06]">
                    <h2 className="font-display text-xl font-semibold text-ink">Edit Profile</h2>
                    <button
                        onClick={handleClose}
                        className="w-9 h-9 rounded-full hover:bg-cream-deep flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-ink-soft" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cream-deep">
                                <img
                                    src={imagePreview || avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=faces'}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {uploadingAvatar && (
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-cream animate-spin" />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadingAvatar}
                                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-moss text-cream hover:bg-rust transition-colors flex items-center justify-center border-2 border-paper disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                        </div>
                        {(selectedFile || imagePreview) && (
                            <button
                                type="button"
                                onClick={removeImage}
                                className="text-xs text-rust hover:text-rust/80 mt-2 transition-colors"
                            >
                                Remove photo
                            </button>
                        )}
                        <p className="text-xs text-ink-soft mt-1">Click camera icon to change avatar</p>
                    </div>

                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-ink mb-1.5">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-2.5 rounded-xl bg-cream-deep border border-[#1C1B19]/[0.08] focus:border-moss/50 focus:ring-2 focus:ring-moss/20 outline-none text-sm text-ink placeholder:text-ink-soft/50 transition-all duration-200"
                            maxLength={50}
                        />
                        <div className="text-xs text-ink-soft/60 text-right mt-1">
                            {name.length}/50
                        </div>
                    </div>

                    {/* Bio Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-ink mb-1.5">
                            Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                            className="w-full px-4 py-2.5 rounded-xl bg-cream-deep border border-[#1C1B19]/[0.08] focus:border-moss/50 focus:ring-2 focus:ring-moss/20 outline-none text-sm text-ink placeholder:text-ink-soft/50 transition-all duration-200 resize-none"
                            rows={3}
                            maxLength={160}
                        />
                        <div className="text-xs text-ink-soft/60 text-right mt-1">
                            {bio.length}/160
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C1B19]/[0.06]">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-5 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink bg-cream-deep hover:bg-cream-deep/70 rounded-pill transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || uploadingAvatar || !name.trim()}
                            className="px-6 py-2.5 text-sm font-semibold text-cream bg-ink hover:bg-rust rounded-pill transition-all shadow-[0_8px_0_0_#1C1B19] hover:shadow-[0_8px_0_0_#8B3A1A] active:translate-y-1 active:shadow-[0_4px_0_0_#8B3A1A] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_8px_0_0_#1C1B19] flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {uploadingAvatar ? 'Uploading...' : 'Saving...'}
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
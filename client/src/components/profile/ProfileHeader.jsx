import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileStats from './ProfileStats';
import ProfileBadge from './ProfileBadge';
import EditProfileModal from '../modals/EditProfileModal';
import toast from 'react-hot-toast';

const ProfileHeader = ({
    user,
    isOwnProfile,
    postsCount,
    followersCount: initialFollowers,
    followingCount: initialFollowing,
    onFollowUpdate,
    onProfileUpdate
}) => {
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [followersCount, setFollowersCount] = useState(initialFollowers || 0);
    const [followingCount] = useState(initialFollowing || 0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Check if current user is following this profile
    useEffect(() => {
        const checkFollowStatus = async () => {
            if (isOwnProfile || !user?._id) return;

            try {
                const response = await fetch(`http://localhost:5000/api/users/${user._id}/is-following`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setIsFollowing(data.data?.isFollowing || false);
            } catch (error) {
                console.error('Check follow status error:', error);
            }
        };

        checkFollowStatus();
    }, [user?._id, isOwnProfile]);

    // Update followers count when prop changes
    useEffect(() => {
        setFollowersCount(initialFollowers || 0);
    }, [initialFollowers]);

    const handleFollow = async () => {
        if (loading) return;
        setLoading(true);

        // Optimistic update
        setIsFollowing(true);
        const newCount = followersCount + 1;
        setFollowersCount(newCount);
        onFollowUpdate?.(newCount);

        try {
            const response = await fetch(`http://localhost:5000/api/users/${user._id}/follow`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();

            if (!data.success) {
                setIsFollowing(false);
                const revertCount = followersCount - 1;
                setFollowersCount(revertCount);
                onFollowUpdate?.(revertCount);
                toast.error(data.message);
            }
        } catch (error) {
            setIsFollowing(false);
            const revertCount = followersCount - 1;
            setFollowersCount(revertCount);
            onFollowUpdate?.(revertCount);
            toast.error('Failed to follow user');
        } finally {
            setLoading(false);
        }
    };

    const handleUnfollow = async () => {
        if (loading) return;
        setLoading(true);

        // Optimistic update
        setIsFollowing(false);
        const newCount = followersCount - 1;
        setFollowersCount(newCount);
        onFollowUpdate?.(newCount);

        try {
            const response = await fetch(`http://localhost:5000/api/users/${user._id}/unfollow`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();

            if (!data.success) {
                setIsFollowing(true);
                const revertCount = followersCount + 1;
                setFollowersCount(revertCount);
                onFollowUpdate?.(revertCount);
                toast.error(data.message);
            }
        } catch (error) {
            setIsFollowing(true);
            const revertCount = followersCount + 1;
            setFollowersCount(revertCount);
            onFollowUpdate?.(revertCount);
            toast.error('Failed to unfollow user');
        } finally {
            setLoading(false);
        }
    };

    const handleMessage = () => {
        navigate(`/messages/${user._id}`);
    };

    const handleEditProfile = () => {
        setIsEditModalOpen(true);
    };

    const handleProfileUpdate = (updatedUser) => {
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Notify parent to refresh
        onProfileUpdate?.(updatedUser);
    };

    const userData = {
        name: user?.name || 'User',
        username: user?.email?.split('@')[0] || 'user',
        bio: user?.bio || 'This user has not added a bio yet.',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=faces',
        cover: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop',
        role: 'Member',
    };

    const stats = [
        { num: postsCount || 0, label: 'Posts' },
        { num: followersCount || 0, label: 'Followers' },
        { num: followingCount || 0, label: 'Following' },
        { num: '0', label: 'Likes' },
    ];

    return (
        <>
            <div className="relative">
                {/* Cover Image */}
                <div className="h-[220px] rounded-t-lg overflow-hidden">
                    <img
                        src={userData.cover}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Floating Stat Badge */}
                <ProfileBadge count={postsCount} />

                {/* Profile Info Card */}
                <div className="bg-paper border border-[#1C1B19]/[0.12] border-t-0 rounded-b-lg px-8 pb-6">
                    <div className="flex items-end justify-between flex-wrap gap-4 -mt-10 pt-4">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={userData.avatar}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full border-4 border-paper object-cover -rotate-2"
                            />
                            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-moss border-2 border-paper flex items-center justify-center text-cream text-xs">
                                ✓
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pb-2">
                            {isOwnProfile ? (
                                <>
                                    <button
                                        onClick={handleEditProfile}
                                        className="px-5 py-2.5 rounded-pill border-2 border-ink text-ink text-sm font-bold hover:bg-cream-deep transition-colors"
                                    >
                                        Edit profile
                                    </button>
                                    <button className="px-5 py-2.5 rounded-pill border-2 border-ink bg-ink text-cream text-sm font-bold hover:bg-rust hover:border-rust transition-colors">
                                        Share profile
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={isFollowing ? handleUnfollow : handleFollow}
                                        disabled={loading}
                                        className={`px-5 py-2.5 rounded-pill text-sm font-bold transition-all duration-200 ${isFollowing
                                                ? 'border-2 border-ink text-ink hover:bg-cream-deep'
                                                : 'border-2 border-ink bg-ink text-cream hover:bg-rust hover:border-rust'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {loading ? (
                                            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        ) : isFollowing ? (
                                            'Following'
                                        ) : (
                                            'Follow'
                                        )}
                                    </button>
                                    <button
                                        onClick={handleMessage}
                                        className="px-5 py-2.5 rounded-pill border-2 border-ink text-ink text-sm font-bold hover:bg-cream-deep transition-colors"
                                    >
                                        Message
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <h1 className="font-display text-2xl font-semibold text-ink mt-4">
                        {userData.name}
                    </h1>

                    {/* Username + Role */}
                    <div className="text-sm text-ink-soft mb-3">
                        @{userData.username} ·{' '}
                        <span className="text-moss font-semibold">{userData.role}</span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-ink-soft max-w-md leading-relaxed mb-5">
                        {userData.bio}
                    </p>

                    {/* Stats */}
                    <ProfileStats stats={stats} />
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
                onProfileUpdate={handleProfileUpdate}
            />
        </>
    );
};

export default ProfileHeader;
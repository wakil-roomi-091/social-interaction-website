import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfilePostCard from '../components/profile/ProfilePostCard';
import ImageLightbox from '../components/common/ImageLightbox';
import VideoLightbox from '../components/common/VideoLightbox';
import { postsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Posts');
    const [loading, setLoading] = useState(true);
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    // ✅ Media Lightbox states
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [mediaIndex, setMediaIndex] = useState(0);
    const [mediaType, setMediaType] = useState('image');

    // ✅ Tabs - Removed "Likes"
    const tabs = ['Posts', 'Media', 'Saved'];

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUserId = currentUser?._id;
    const isOwnProfile = !userId || userId === currentUserId;

    // ✅ Open media viewer with index
    const handleMediaClick = (index) => {
        setMediaIndex(index);
        setMediaType('image');
        setLightboxOpen(true);
    };

    // ✅ Close lightbox
    const handleCloseLightbox = () => {
        setLightboxOpen(false);
        setMediaIndex(0);
    };

    // ✅ Navigation handlers
    const handlePreviousMedia = () => {
        setMediaIndex(prev => (prev > 0 ? prev - 1 : gridMedia.length - 1));
    };

    const handleNextMedia = () => {
        setMediaIndex(prev => (prev < gridMedia.length - 1 ? prev + 1 : 0));
    };

    // ✅ Fetch profile data from database
    const fetchProfile = async () => {
        try {
            setLoading(true);

            const targetUserId = userId || currentUserId;

            if (!targetUserId) {
                toast.error('Please login to view profile');
                navigate('/login');
                return;
            }

            // ✅ Fetch user data from database
            const userResponse = await fetch(`http://localhost:5000/api/users/${targetUserId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!userResponse.ok) {
                if (userResponse.status === 404) {
                    toast.error('User not found');
                    navigate('/feed');
                    return;
                }
                throw new Error('Failed to fetch user');
            }

            const userData = await userResponse.json();
            const userFromDb = userData.data;

            // ✅ Update state with fresh data from database
            setProfileUser(userFromDb);
            setFollowersCount(userFromDb.followers?.length || 0);
            setFollowingCount(userFromDb.following?.length || 0);

            // ✅ Fetch all posts
            const postsResponse = await postsAPI.getAll();
            const allPosts = postsResponse.data.data || [];

            // ✅ Filter user's posts
            const userPosts = allPosts.filter(
                post => post.user?._id === targetUserId
            );
            setPosts(userPosts);

            // ✅ Filter saved posts
            const userSavedPosts = allPosts.filter(
                post => userFromDb.savedPosts?.includes(post._id)
            );
            setSavedPosts(userSavedPosts);

        } catch (error) {
            console.error('Profile fetch error:', error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle profile update after editing
    const handleProfileUpdate = async (updatedUser) => {
        setProfileUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        await fetchProfile();
    };

    // ✅ Handle follow/unfollow update
    const handleFollowUpdate = (newFollowersCount) => {
        setFollowersCount(newFollowersCount);
    };

    // ✅ Handle post delete
    const handlePostDelete = (postId) => {
        setPosts(prev => prev.filter(post => post._id !== postId));
        setSavedPosts(prev => prev.filter(post => post._id !== postId));
    };

    // ✅ Handle save update from PostCard
    const handleSaveUpdate = async () => {
        await fetchProfile();
    };

    useEffect(() => {
        fetchProfile();
    }, [userId, currentUserId, navigate]);

    if (loading) {
        return (
            <div className="bg-cream font-body min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-moss border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-ink-soft text-sm">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="bg-cream font-body min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-ink-soft text-sm">User not found</p>
                    <button
                        onClick={() => navigate('/feed')}
                        className="mt-4 px-6 py-2 rounded-pill bg-ink text-cream text-sm font-bold hover:bg-rust transition-colors"
                    >
                        Back to Feed
                    </button>
                </div>
            </div>
        );
    }

    // ✅ Media posts (images only for now)
    const mediaPosts = posts.filter(post => post.image);

    // ✅ Extract image URLs for grid and lightbox
    const gridMedia = mediaPosts.map(post => post.image);

    return (
        <div className="bg-cream font-body min-h-screen relative">
            <div className="max-w-[1100px] mx-auto px-[5%] py-8 relative">

                <BackButton label="Back to Feed" to="/feed" />

                <div className="mt-12">
                    {/* ✅ Profile Header with real data */}
                    <ProfileHeader
                        user={profileUser}
                        isOwnProfile={isOwnProfile}
                        postsCount={posts.length}
                        followersCount={followersCount}
                        followingCount={followingCount}
                        onFollowUpdate={handleFollowUpdate}
                        onProfileUpdate={handleProfileUpdate}
                    />

                    {/* Profile Tabs - Updated with only 3 tabs */}
                    <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

                    {/* Posts Tab */}
                    {activeTab === 'Posts' && (
                        <div className="space-y-4 mt-4">
                            {posts.length === 0 ? (
                                <div className="text-center py-12 text-ink-soft">
                                    <p>No posts yet</p>
                                    {isOwnProfile && (
                                        <p className="text-sm mt-1">Share your first post!</p>
                                    )}
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <ProfilePostCard
                                        key={post._id}
                                        post={post}
                                        user={profileUser}
                                        onPostUpdate={handlePostDelete}
                                        onSaveUpdate={handleSaveUpdate}
                                    />
                                ))
                            )}
                        </div>
                    )}

                    {/* ✅ Media Tab - With click to open lightbox and navigation */}
                    {activeTab === 'Media' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {gridMedia.length === 0 ? (
                                <div className="col-span-3 text-center py-12 text-ink-soft">
                                    <p className="text-lg font-display text-ink mb-2">No media posts yet</p>
                                    <p className="text-sm">Share photos to build your media gallery</p>
                                    {isOwnProfile && (
                                        <button
                                            onClick={() => navigate('/feed')}
                                            className="mt-4 px-6 py-2 rounded-pill bg-moss text-cream text-sm font-bold hover:bg-rust transition-colors"
                                        >
                                            Create a Post
                                        </button>
                                    )}
                                </div>
                            ) : (
                                gridMedia.map((url, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-md overflow-hidden cursor-pointer group relative bg-cream-deep/30"
                                        onClick={() => handleMediaClick(index)}
                                    >
                                        <img
                                            src={url}
                                            alt={`Media ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        {/* Hover overlay with zoom icon */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* ✅ Saved Tab */}
                    {activeTab === 'Saved' && (
                        <div className="space-y-4 mt-4">
                            {savedPosts.length === 0 ? (
                                <div className="text-center py-12 text-ink-soft">
                                    <p className="text-lg font-display text-ink mb-2">No saved posts</p>
                                    <p className="text-sm">Save posts you want to revisit later</p>
                                    {isOwnProfile && (
                                        <button
                                            onClick={() => navigate('/feed')}
                                            className="mt-4 px-6 py-2 rounded-pill bg-moss text-cream text-sm font-bold hover:bg-rust transition-colors"
                                        >
                                            Explore Feed
                                        </button>
                                    )}
                                </div>
                            ) : (
                                savedPosts.map((post) => (
                                    <ProfilePostCard
                                        key={post._id}
                                        post={post}
                                        user={post.user || profileUser}
                                        onPostUpdate={handlePostDelete}
                                        onSaveUpdate={handleSaveUpdate}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ Image Lightbox with Navigation */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={handleCloseLightbox}
                images={gridMedia}
                currentIndex={mediaIndex}
                onPrevious={handlePreviousMedia}
                onNext={handleNextMedia}
                alt="Media image"
            />

            {/* ✅ Video Lightbox (for future video support) */}
            <VideoLightbox
                isOpen={lightboxOpen && mediaType === 'video'}
                onClose={handleCloseLightbox}
                videoUrl={gridMedia[mediaIndex] || ''}
                alt="Media video"
            />
        </div>
    );
};

export default Profile;
import { useState, useEffect } from 'react';
import BackButton from '../components/common/BackButton';
import CreatePostModal from '../components/modals/CreatePostModal';
import FeedSidebar from '../components/feed/FeedSidebar';
import Stories from '../components/feed/Stories';
import CreatePost from '../components/feed/CreatePost';
import PostCard from '../components/feed/PostCard';
import TrendingCommunities from '../components/feed/TrendingCommunities';
import PeopleToFollow from '../components/feed/PeopleToFollow';
import QuoteCard from '../components/feed/QuoteCard';
import { postsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Feed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await postsAPI.getAll();
            setPosts(response.data.data || []);
        } catch (error) {
            console.error('Fetch posts error:', error);
            toast.error('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = (newPost) => {
        console.log('📝 New post created:', newPost);
        setPosts([newPost, ...posts]);
    };

    const handleLikeUpdate = (postId, updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId ? updatedPost : post
            )
        );
    };

    const handleCommentUpdate = (postId, updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId ? updatedPost : post
            )
        );
    };

    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    };

    const handlePostUpdate = (postId, updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId ? updatedPost : post
            )
        );
    };

    return (
        <div className="bg-cream font-body min-h-screen relative">
            <div className="max-w-[1400px] mx-auto px-[5%] py-8 relative">

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6 mt-12">
                    {/* Left Sidebar */}
                    <div className="hidden lg:block">
                        <FeedSidebar onOpenModal={() => setIsModalOpen(true)} />
                    </div>

                    {/* Center Feed */}
                    <main className="space-y-5">
                        <Stories />
                        <CreatePost onOpenModal={() => setIsModalOpen(true)} />

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-8 h-8 border-4 border-moss border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                <p className="text-ink-soft text-sm">Loading posts...</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-12 bg-paper border border-[#1C1B19]/[0.12] rounded-lg">
                                <p className="text-ink-soft text-sm">No posts yet. Be the first to share something!</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    onLikeUpdate={handleLikeUpdate}
                                    onCommentUpdate={handleCommentUpdate}
                                    onDelete={handleDeletePost}
                                    onPostUpdate={handlePostUpdate}
                                />
                            ))
                        )}
                    </main>

                    {/* Right Panel */}
                    <aside className="hidden lg:block space-y-5">
                        <TrendingCommunities />
                        <PeopleToFollow />
                        <QuoteCard />
                    </aside>
                </div>
            </div>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPostCreated={handlePostCreated}
            />
        </div>
    );
};

export default Feed;
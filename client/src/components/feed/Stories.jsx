import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { storyAPI } from '../../services/api';
import CreateStoryModal from '../modals/CreateStoryModal';
import StoryViewer from '../stories/StoryViewer';

const Stories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [selectedStories, setSelectedStories] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const fetchStories = async () => {
        try {
            setLoading(true);
            const response = await storyAPI.getAll();
            console.log('📚 Stories API Response:', response.data.data);
            setStories(response.data.data || []);
        } catch (error) {
            console.error('Fetch stories error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleStoryCreated = () => {
        fetchStories();
    };

    const handleStoryDeleted = (storyId) => {
        console.log('🗑️ Story deleted:', storyId);
        fetchStories();
    };

    const handleUserClick = (userStories) => {
        console.log('👆 Clicked user stories:', userStories);
        setSelectedStories(userStories);
        setSelectedIndex(0);
        setIsViewerOpen(true);
    };

    const handleViewerClose = () => {
        setIsViewerOpen(false);
        setSelectedStories([]);
        setSelectedIndex(0);
        fetchStories();
    };

    return (
        <>
            <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-4">
                <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-1">
                    {/* Add Story Button */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-moss to-moss-light hover:from-rust hover:to-rust transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <Plus className="w-8 h-8 text-cream" />
                        </button>
                        <span className="text-xs text-ink-soft font-medium">Add Story</span>
                    </div>

                    {/* User Stories */}
                    {loading ? (
                        <div className="flex items-center justify-center w-full py-4">
                            <Loader2 className="w-6 h-6 text-ink-soft/40 animate-spin" />
                        </div>
                    ) : stories.length === 0 ? (
                        <div className="text-sm text-ink-soft/60 py-2 px-4">
                            No stories to show
                        </div>
                    ) : (
                        stories.map((userData) => {
                            const user = userData.user;
                            const userStories = userData.stories;
                            const hasUnviewed = userStories.some(s => !s.viewed);
                            const isOwnStory = user._id === currentUser._id;

                            return (
                                <button
                                    key={user._id}
                                    onClick={() => handleUserClick(userStories)}
                                    className="flex flex-col items-center gap-1 flex-shrink-0 group"
                                >
                                    <div className={`
                                        w-16 h-16 rounded-full p-0.5 
                                        ${hasUnviewed && !isOwnStory
                                            ? 'bg-gradient-to-tr from-rust to-butter'
                                            : 'bg-[#1C1B19]/[0.08]'
                                        }
                                    `}>
                                        <div className="w-full h-full rounded-full bg-paper p-0.5">
                                            <img
                                                src={user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
                                                alt={user?.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <span className="text-xs text-ink-soft font-medium truncate max-w-[60px]">
                                        {user?.name?.split(' ')[0] || 'User'}
                                    </span>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Create Story Modal */}
            <CreateStoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onStoryCreated={handleStoryCreated}
            />

            {/* Story Viewer */}
            <StoryViewer
                isOpen={isViewerOpen}
                onClose={handleViewerClose}
                stories={selectedStories}
                currentIndex={selectedIndex}
                currentUser={currentUser}
                onStoryDeleted={handleStoryDeleted}
            />
        </>
    );
};

export default Stories;
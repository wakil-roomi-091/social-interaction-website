import { User, PenSquare } from 'lucide-react';

const CreatePost = ({ onOpenModal }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user?.name || 'User';
    const avatar = user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces';

    return (
        <div
            onClick={onOpenModal}
            className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-[#1C1B19]/[0.25] transition-colors group"
        >
            <img
                src={avatar}
                alt=""
                className="w-11 h-11 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 bg-cream-deep rounded-pill px-5 py-2.5 text-ink-soft text-sm group-hover:bg-cream-deep/80 transition-colors flex items-center gap-2">
                <PenSquare className="w-4 h-4 text-ink-soft/50" />
                What's on your mind, {userName}?
            </div>
        </div>
    );
};

export default CreatePost;
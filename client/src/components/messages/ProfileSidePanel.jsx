import { useNavigate } from 'react-router-dom';
import { User, UserX } from 'lucide-react';

const ProfileSidePanel = ({ contact }) => {
    const navigate = useNavigate();
    const username = contact.name?.toLowerCase().replace(' ', '.') || 'user';

    const handleViewProfile = () => {
        if (contact.userId) {
            navigate(`/profile/${contact.userId}`);
        }
    };

    return (
        <div className="hidden md:flex flex-col items-center border-l border-[#1C1B19]/[0.1] p-6">
            <img
                src={contact.img}
                alt=""
                className="w-16 h-16 rounded-full object-cover mb-3 rotate-2"
            />
            <div className="text-sm font-bold text-ink">{contact.name}</div>
            <div className="text-xs text-ink-soft mb-4">
                @{username}
            </div>
            <div className="w-full h-px bg-[#1C1B19]/[0.1] mb-4" />

            {/* ✅ Professional Status Indicator */}
            <div className="flex items-center gap-2 text-xs text-ink-soft mb-5">
                <span className={`w-2.5 h-2.5 rounded-full ${contact.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className={contact.online ? 'text-green-600' : 'text-gray-500'}>
                    {contact.online ? 'Online' : 'Offline'}
                </span>
                {contact.unreadCount > 0 && (
                    <span className="text-rust font-semibold ml-1">
                        · {contact.unreadCount} unread
                    </span>
                )}
            </div>

            <button
                onClick={handleViewProfile}
                className="w-full py-2.5 rounded-pill border-2 border-ink text-ink text-xs font-bold mb-2 hover:bg-cream-deep transition-colors flex items-center justify-center gap-2"
            >
                <User className="w-3.5 h-3.5" />
                View profile
            </button>
            <button className="w-full py-2.5 rounded-pill bg-cream-deep text-ink-soft text-xs font-bold hover:bg-rust/10 hover:text-rust transition-colors flex items-center justify-center gap-2">
                <UserX className="w-3.5 h-3.5" />
                Unfollow
            </button>
        </div>
    );
};

export default ProfileSidePanel;
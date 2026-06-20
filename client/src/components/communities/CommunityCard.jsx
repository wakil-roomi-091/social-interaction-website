import { useState } from 'react';
import { Users } from 'lucide-react';

const CommunityCard = ({ community }) => {
    const [isJoined, setIsJoined] = useState(community.isJoined);

    const toggleJoin = () => {
        setIsJoined(!isJoined);
    };

    const formatMembers = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count;
    };

    return (
        <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.15)]">
            {/* Image */}
            <div className="h-[140px] overflow-hidden">
                <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="font-display text-lg font-semibold text-ink">
                            {community.name}
                        </h3>
                        <div className="text-xs text-moss font-semibold uppercase tracking-wider mt-0.5">
                            {community.category}
                        </div>
                    </div>
                </div>

                <p className="text-sm text-ink-soft leading-relaxed mb-4 line-clamp-2">
                    {community.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-ink-soft">
                        <Users className="w-4 h-4" />
                        <span>{formatMembers(community.members)} members</span>
                    </div>

                    <button
                        onClick={toggleJoin}
                        className={`px-4 py-1.5 rounded-pill text-xs font-bold border transition-colors ${isJoined
                                ? 'border-moss text-moss hover:bg-moss hover:text-cream'
                                : 'bg-moss text-cream border-moss hover:bg-rust hover:border-rust'
                            }`}
                    >
                        {isJoined ? 'Joined' : 'Join'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityCard;
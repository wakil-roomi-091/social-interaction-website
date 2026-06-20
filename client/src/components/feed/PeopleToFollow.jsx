import { useState } from 'react';

const SuggestItem = ({ img, name, mutual }) => {
    const [following, setFollowing] = useState(false);

    return (
        <div className="flex items-center gap-3">
            <img src={img} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1">
                <div className="text-sm font-bold text-ink">{name}</div>
                <div className="text-xs text-ink-soft">{mutual}</div>
            </div>
            <button
                onClick={() => setFollowing(!following)}
                className={`text-xs font-bold border rounded-pill px-3 py-1.5 transition-colors ${following
                        ? 'border-ink-soft text-ink-soft bg-transparent hover:bg-ink hover:text-cream hover:border-ink'
                        : 'border-moss text-moss hover:bg-moss hover:text-cream'
                    }`}
            >
                {following ? 'Following' : 'Follow'}
            </button>
        </div>
    );
};

const PeopleToFollow = () => {
    const suggestions = [
        {
            img: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&h=100&fit=crop&crop=faces',
            name: 'Sana Raza',
            mutual: '6 mutual friends',
        },
        {
            img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=100&h=100&fit=crop&crop=faces',
            name: 'Mark Webb',
            mutual: '3 mutual friends',
        },
    ];

    return (
        <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-4">
                People to follow
            </div>
            <div className="space-y-3">
                {suggestions.map((item, index) => (
                    <SuggestItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default PeopleToFollow;
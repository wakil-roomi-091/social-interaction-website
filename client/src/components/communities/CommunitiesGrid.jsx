import CommunityCard from './CommunityCard';

const CommunitiesGrid = ({ communities }) => {
    if (communities.length === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed border-[#1C1B19]/[0.12] rounded-lg">
                <p className="text-ink-soft text-sm">No communities found matching your search.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
            ))}
        </div>
    );
};

export default CommunitiesGrid;
import { Search } from 'lucide-react';

const CommunitiesSearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="flex items-center gap-3 bg-paper border border-[#1C1B19]/[0.12] rounded-pill px-5 py-3 mb-5 max-w-md">
            <Search className="w-4 h-4 text-ink-soft" />
            <input
                type="text"
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent placeholder:text-ink-soft/60 text-ink"
            />
        </div>
    );
};

export default CommunitiesSearch;
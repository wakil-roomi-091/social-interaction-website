const ExploreSearch = () => {
    return (
        <div className="flex items-center gap-3 bg-paper border border-[#1C1B19]/[0.12] rounded-pill px-5 py-3 mb-5 max-w-md">
            <span className="text-ink-soft">🔍</span>
            <input
                type="text"
                placeholder="Discover amazing content..."
                className="flex-1 outline-none text-sm bg-transparent placeholder:text-ink-soft"
            />
        </div>
    );
};

export default ExploreSearch;
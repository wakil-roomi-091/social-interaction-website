const CommunitiesFilter = ({ categories, activeCat, setActiveCat }) => {
    return (
        <div className="flex gap-2 mb-8 flex-wrap">
            {categories.map((c) => (
                <button
                    key={c}
                    onClick={() => setActiveCat(c)}
                    className={`px-4 py-2 rounded-pill text-sm font-semibold border transition-colors ${activeCat === c
                            ? 'bg-moss text-cream border-moss'
                            : 'bg-paper text-ink-soft border-[#1C1B19]/[0.12] hover:border-moss hover:text-ink'
                        }`}
                >
                    {c}
                </button>
            ))}
        </div>
    );
};

export default CommunitiesFilter;
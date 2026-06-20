const ExploreFilters = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex gap-2 mb-8 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-pill text-sm font-semibold border transition-colors ${
            activeFilter === filter
              ? 'bg-moss text-cream border-moss'
              : 'bg-paper text-ink-soft border-[#1C1B19]/[0.12] hover:border-moss hover:text-ink'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ExploreFilters;
const ExploreCard = ({ item, sizeClass }) => {
    return (
        <div
            className={`relative rounded-md overflow-hidden cursor-pointer group ${sizeClass}`}
        >
            <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-[10px] font-bold uppercase tracking-wider text-butter mb-1">
                    {item.tag}
                </div>
                <div className="font-display text-cream text-base font-semibold mb-1">
                    {item.title}
                </div>
                <div className="text-cream/70 text-xs">{item.meta}</div>
                <div className="flex gap-2 mt-3">
                    <button className="text-xs font-bold bg-cream/15 text-cream rounded-pill px-3 py-1.5 hover:bg-cream/25 transition-colors">
                        Save
                    </button>
                    <button className="text-xs font-bold bg-cream/15 text-cream rounded-pill px-3 py-1.5 hover:bg-cream/25 transition-colors">
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExploreCard;
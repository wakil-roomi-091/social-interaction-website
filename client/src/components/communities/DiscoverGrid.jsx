const DiscoverGrid = ({ items }) => {
    return (
        <>
            <h3 className="font-display text-xl font-semibold text-ink mb-5">
                Discover new communities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {items.map((c) => (
                    <div
                        key={c.name}
                        className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.2)] cursor-pointer"
                    >
                        <img src={c.img} alt={c.name} className="w-full h-[150px] object-cover" />
                        <div className="p-4">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-rust mb-1.5">
                                {c.tag}
                            </div>
                            <div className="font-display text-lg font-semibold text-ink mb-1">
                                {c.name}
                            </div>
                            <p className="text-xs text-ink-soft leading-relaxed mb-3">
                                {c.desc}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-ink-soft font-semibold">
                                    {c.members} members
                                </span>
                                <button className="text-xs font-bold border-2 border-moss text-moss rounded-pill px-3.5 py-1.5 hover:bg-moss hover:text-cream transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DiscoverGrid;
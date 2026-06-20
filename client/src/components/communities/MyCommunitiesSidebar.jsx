const MyCommunitiesSidebar = ({ communities }) => {
    return (
        <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-4">
                Your communities
            </div>
            <div className="space-y-1">
                {communities.map((c) => (
                    <div
                        key={c.name}
                        className="flex items-center gap-3 p-2.5 rounded-md hover:bg-cream-deep/60 cursor-pointer transition-colors"
                    >
                        <img
                            src={c.img}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-ink truncate">
                                {c.name}
                            </div>
                            <div className="text-xs text-ink-soft">{c.members}</div>
                        </div>
                        {c.unread > 0 && (
                            <span className="bg-rust text-cream text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                                {c.unread}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2.5 rounded-pill border-2 border-ink text-ink text-xs font-bold hover:bg-cream-deep transition-colors">
                See all (7)
            </button>
        </div>
    );
};

export default MyCommunitiesSidebar;
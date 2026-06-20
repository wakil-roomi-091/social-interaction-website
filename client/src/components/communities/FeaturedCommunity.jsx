const FeaturedCommunity = ({ featured }) => {
    return (
        <div className="relative rounded-lg overflow-hidden mb-10 group cursor-pointer">
            <img
                src={featured.img}
                alt={featured.name}
                className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="text-[11px] font-bold uppercase tracking-wider text-butter mb-2">
                    {featured.tag}
                </div>
                <h2 className="font-display text-3xl font-semibold text-cream mb-2">
                    {featured.name}
                </h2>
                <p className="text-cream/80 text-sm max-w-lg leading-relaxed mb-4">
                    {featured.desc}
                </p>
                <div className="flex items-center gap-5 flex-wrap">
                    <span className="text-cream text-sm font-semibold">
                        {featured.members} members
                    </span>
                    <span className="text-cream/60 text-sm">·</span>
                    <span className="text-cream text-sm font-semibold">
                        {featured.posts} posts this week
                    </span>
                    <button className="ml-0 md:ml-auto px-5 py-2.5 rounded-pill bg-cream text-ink text-sm font-bold hover:bg-butter transition-colors">
                        Join community
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCommunity;
const CommunityGrid = () => {
    return (
        <section id="community" className="px-[5%] py-[110px] max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="flex justify-between items-end gap-10 flex-wrap mb-16">
                <div>
                    <div className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[2px] uppercase text-moss mb-[18px]">
                        <span className="w-7 h-[2px] bg-moss"></span>
                        Explore communities
                    </div>
                    <h2 className="font-display text-[clamp(36px,5vw,58px)] font-semibold tracking-[-1.5px] leading-[1.08] text-ink">
                        Something for<br /><span className="italic text-rust">everyone</span>
                    </h2>
                </div>
                <p className="text-[17px] text-ink-soft max-w-[380px] leading-relaxed">
                    Browse trending spaces across art, music, sports, food, and travel — or start your own in under a minute.
                </p>
            </div>

            {/* Community Grid - 4x2 Mosaic */}
            <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-[200px_200px] gap-4">
                {/* Big Tile - spans 2 columns and 2 rows */}
                <div className="reveal col-span-2 row-span-2 rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-350 hover:scale-[0.98] group">
                    <img
                        src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&h=900&fit=crop"
                        alt="Street art and creative community"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,27,25,0.75)] to-transparent flex flex-col justify-end p-[18px] text-white">
                        <div className="text-[11px] font-bold tracking-[1.5px] uppercase opacity-80 mb-1">Art & Design</div>
                        <div className="font-display text-[19px] font-semibold">Creative Collective</div>
                    </div>
                </div>

                {/* Small Tile 1 */}
                <div className="reveal rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-350 hover:scale-[0.98] group">
                    <img
                        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=400&fit=crop"
                        alt="Music festival crowd"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,27,25,0.75)] to-transparent flex flex-col justify-end p-[18px] text-white">
                        <div className="text-[11px] font-bold tracking-[1.5px] uppercase opacity-80 mb-1">Music</div>
                        <div className="font-display text-[19px] font-semibold">Live Sessions</div>
                    </div>
                </div>

                {/* Small Tile 2 */}
                <div className="reveal rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-350 hover:scale-[0.98] group">
                    <img
                        src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=400&fit=crop"
                        alt="Basketball game"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,27,25,0.75)] to-transparent flex flex-col justify-end p-[18px] text-white">
                        <div className="text-[11px] font-bold tracking-[1.5px] uppercase opacity-80 mb-1">Sports</div>
                        <div className="font-display text-[19px] font-semibold">Weekend Leagues</div>
                    </div>
                </div>

                {/* Wide Tile - spans 2 columns */}
                <div className="reveal col-span-2 rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-350 hover:scale-[0.98] group">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=400&fit=crop"
                        alt="Food market with fresh produce"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,27,25,0.75)] to-transparent flex flex-col justify-end p-[18px] text-white">
                        <div className="text-[11px] font-bold tracking-[1.5px] uppercase opacity-80 mb-1">Food</div>
                        <div className="font-display text-[19px] font-semibold">Home Cooks Club</div>
                    </div>
                </div>

                {/* Small Tile 3 */}
                <div className="reveal rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-350 hover:scale-[0.98] group">
                    <img
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop"
                        alt="Travel destination mountains"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,27,25,0.75)] to-transparent flex flex-col justify-end p-[18px] text-white">
                        <div className="text-[11px] font-bold tracking-[1.5px] uppercase opacity-80 mb-1">Travel</div>
                        <div className="font-display text-[19px] font-semibold">Wanderers</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityGrid;
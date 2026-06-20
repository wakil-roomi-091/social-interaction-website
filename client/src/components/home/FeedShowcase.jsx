const FeedShowcase = () => {
    return (
        <section id="showcase" className="px-[5%] py-[110px] max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="flex justify-between items-end gap-10 flex-wrap mb-16">
                <div>
                    <div className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[2px] uppercase text-moss mb-[18px]">
                        <span className="w-7 h-[2px] bg-moss"></span>
                        Inside the feed
                    </div>
                    <h2 className="font-display text-[clamp(36px,5vw,58px)] font-semibold tracking-[-1.5px] leading-[1.08] text-ink">
                        A feed that feels<br />like <span className="italic text-rust">scrolling through</span><br />a friend's camera roll
                    </h2>
                </div>
                <p className="text-[17px] text-ink-soft max-w-[380px] leading-relaxed">
                    Posts from people you actually follow, in the order they were shared. Stories, photo dumps, voice notes, and long-form thoughts — all in one place.
                </p>
            </div>

            {/* Feed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr] gap-6 items-start">
                {/* Column 1 */}
                <div className="flex flex-col gap-6">
                    <div className="reveal bg-paper rounded-2xl overflow-hidden border border-[rgba(28,27,25,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.2)]">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop" alt="" className="w-full h-[380px] object-cover" />
                        <div className="p-[18px]">
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <img src="https://images.unsplash.com/photo-1500648767791-00d5a4ee9bb1?w=100&h=100&fit=crop&crop=faces" alt="" className="w-[34px] h-[34px] rounded-full object-cover" />
                                <div><div className="text-[13px] font-bold">Jordan Lee</div><div className="text-[12px] text-ink-soft">Rooftop sunset · 3h ago</div></div>
                            </div>
                            <p className="text-[14px] text-ink-soft leading-relaxed mb-3">first warm night of the year and the whole crew showed up 🌇</p>
                            <div className="flex gap-[18px] text-[13px] text-ink-soft font-semibold">
                                <span>♥ 312</span><span>💬 28</span><span>↗ Share</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6">
                    <div className="reveal bg-moss text-cream rounded-2xl p-8 font-display text-[22px] italic font-medium leading-relaxed relative">
                        <div className="text-[48px] opacity-30 leading-none mb-2">"</div>
                        I deleted every other app. This is the only feed I actually look forward to opening.
                        <div className="mt-5 font-body text-[13px] font-semibold not-italic opacity-80">— Priya N., joined March 2026</div>
                    </div>
                    <div className="reveal bg-paper rounded-2xl overflow-hidden border border-[rgba(28,27,25,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.2)]">
                        <img src="https://images.unsplash.com/photo-1521305916504-4a1121188589?w=700&h=500&fit=crop" alt="" className="w-full h-[240px] object-cover" />
                        <div className="p-[18px]">
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" alt="" className="w-[34px] h-[34px] rounded-full object-cover" />
                                <div><div className="text-[13px] font-bold">Noor Al-Sayed</div><div className="text-[12px] text-ink-soft">Sunday cooking · 6h ago</div></div>
                            </div>
                            <p className="text-[14px] text-ink-soft leading-relaxed mb-3">made way too much pasta but the kitchen smelled incredible the whole afternoon</p>
                            <div className="flex gap-[18px] text-[13px] text-ink-soft font-semibold">
                                <span>♥ 189</span><span>💬 14</span><span>↗ Share</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-6">
                    <div className="reveal bg-paper rounded-2xl overflow-hidden border border-[rgba(28,27,25,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.2)]">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" alt="" className="w-full h-[180px] object-cover" />
                        <div className="p-[18px]">
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces" alt="" className="w-[34px] h-[34px] rounded-full object-cover" />
                                <div><div className="text-[13px] font-bold">Theo Marsh</div><div className="text-[12px] text-ink-soft">Studio session · 1h ago</div></div>
                            </div>
                            <p className="text-[14px] text-ink-soft leading-relaxed mb-3">new track dropping this week, here's a sneak peek from tonight</p>
                            <div className="flex gap-[18px] text-[13px] text-ink-soft font-semibold">
                                <span>♥ 540</span><span>💬 61</span><span>↗ Share</span>
                            </div>
                        </div>
                    </div>
                    <div className="reveal bg-paper rounded-2xl overflow-hidden border border-[rgba(28,27,25,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.2)]">
                        <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=500&fit=crop" alt="" className="w-full h-[240px] object-cover" />
                        <div className="p-[18px]">
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" alt="" className="w-[34px] h-[34px] rounded-full object-cover" />
                                <div><div className="text-[13px] font-bold">Alina Kovac</div><div className="text-[12px] text-ink-soft">Weekend hike · 9h ago</div></div>
                            </div>
                            <p className="text-[14px] text-ink-soft leading-relaxed mb-3">six hours up, worth every step. who's coming next time?</p>
                            <div className="flex gap-[18px] text-[13px] text-ink-soft font-semibold">
                                <span>♥ 276</span><span>💬 19</span><span>↗ Share</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedShowcase;
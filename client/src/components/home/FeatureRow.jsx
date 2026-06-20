const FeatureRow = () => {
    return (
        <section id="features" className="px-[5%] max-w-[1400px] mx-auto">
            {/* Feature 1 - Messaging */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 border-b border-[rgba(28,27,25,0.12)]">
                <div>
                    <div className="font-display text-[14px] font-bold text-rust tracking-[2px] uppercase mb-4">
                        01 — Messaging
                    </div>
                    <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-1px] leading-[1.1] text-ink mb-[18px]">
                        Conversations that feel like talking to a friend, not a chatbot
                    </h3>
                    <p className="text-[16px] text-ink-soft leading-relaxed max-w-[440px] mb-6">
                        Voice notes, instant replies, group chats that don't get lost in the noise. Built for the way people actually message each other day to day.
                    </p>
                    <ul className="list-none flex flex-col gap-3">
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            Voice messages with waveform playback
                        </li>
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            Read receipts you can turn off
                        </li>
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            Group chats up to 250 people
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=700&h=600&fit=crop"
                        alt="Person messaging on phone in a cafe"
                        className="w-full h-[420px] object-cover rounded-2xl shadow-[0_30px_60px_-25px_rgba(28,27,25,0.3)]"
                    />
                    <div className="absolute -bottom-5 -right-5 bg-paper rounded-2xl py-4 px-5 shadow-[0_16px_40px_-10px_rgba(28,27,25,0.25)] flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-cream-deep flex items-center justify-center text-xl">💬</div>
                        <div>
                            <div className="font-display text-xl font-extrabold leading-none">2.1M</div>
                            <div className="text-[11px] text-ink-soft font-semibold">Messages sent daily</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature 2 - Communities (Reverse) */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 border-b border-[rgba(28,27,25,0.12)]">
                <div className="order-2 lg:order-1 relative">
                    <img
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700&h=600&fit=crop"
                        alt="Group of people at a community meetup"
                        className="w-full h-[420px] object-cover rounded-2xl shadow-[0_30px_60px_-25px_rgba(28,27,25,0.3)]"
                    />
                    <div className="absolute -bottom-5 -right-5 bg-paper rounded-2xl py-4 px-5 shadow-[0_16px_40px_-10px_rgba(28,27,25,0.25)] flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-cream-deep flex items-center justify-center text-xl">🌍</div>
                        <div>
                            <div className="font-display text-xl font-extrabold leading-none">140+</div>
                            <div className="text-[11px] text-ink-soft font-semibold">Countries represented</div>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <div className="font-display text-[14px] font-bold text-rust tracking-[2px] uppercase mb-4">
                        02 — Communities
                    </div>
                    <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-1px] leading-[1.1] text-ink mb-[18px]">
                        Find the corner of the internet that's actually for you
                    </h3>
                    <p className="text-[16px] text-ink-soft leading-relaxed max-w-[440px] mb-6">
                        From neighborhood meetups to niche hobby groups spanning continents — communities on Socially are run by their members, not algorithms.
                    </p>
                    <ul className="list-none flex flex-col gap-3">
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            12,000+ active communities
                        </li>
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            Local events & meetups built in
                        </li>
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            Member-run moderation tools
                        </li>
                    </ul>
                </div>
            </div>

            {/* Feature 3 - Stories & Live */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
                <div>
                    <div className="font-display text-[14px] font-bold text-rust tracking-[2px] uppercase mb-4">
                        03 — Stories & Live
                    </div>
                    <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-1px] leading-[1.1] text-ink mb-[18px]">
                        Share the moment while it's still happening
                    </h3>
                    <p className="text-[16px] text-ink-soft leading-relaxed max-w-[440px] mb-6">
                        Stories disappear after 24 hours, just like the real ones. Or go live and let your community drop in — no production setup required.
                    </p>
                    <ul className="list-none flex flex-col gap-3">
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            24-hour disappearing stories
                        </li>
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            One-tap live broadcasting
                        </li>
                        <li className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-[12px] flex-shrink-0">✓</span>
                            Save favorites to highlights
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&h=600&fit=crop"
                        alt="Person filming a live video on phone"
                        className="w-full h-[420px] object-cover rounded-2xl shadow-[0_30px_60px_-25px_rgba(28,27,25,0.3)]"
                    />
                    <div className="absolute -bottom-5 -right-5 bg-paper rounded-2xl py-4 px-5 shadow-[0_16px_40px_-10px_rgba(28,27,25,0.25)] flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-cream-deep flex items-center justify-center text-xl">⚡</div>
                        <div>
                            <div className="font-display text-xl font-extrabold leading-none">38min</div>
                            <div className="text-[11px] text-ink-soft font-semibold">Avg. daily time saved</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureRow;
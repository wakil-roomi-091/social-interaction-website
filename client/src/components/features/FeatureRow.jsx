const FeatureRow = ({ feature, isLast }) => {
    return (
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 ${!isLast ? 'border-b border-[#1C1B19]/[0.1]' : ''
                }`}
        >
            {/* Text Content */}
            <div className={feature.reverse ? 'lg:order-2' : ''}>
                <div className="font-display text-sm font-bold text-rust tracking-[2px] uppercase mb-4">
                    {feature.num} — Feature
                </div>
                <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-semibold tracking-[-1px] leading-[1.15] text-ink mb-4">
                    {feature.title}
                </h2>
                <p className="text-base text-ink-soft leading-relaxed mb-6 max-w-md">
                    {feature.text}
                </p>
                <ul className="space-y-3">
                    {feature.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-sm font-semibold text-ink">
                            <span className="w-6 h-6 rounded-full bg-butter flex items-center justify-center text-xs flex-shrink-0">
                                ✓
                            </span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Image with Stat Badge */}
            <div className={`relative ${feature.reverse ? 'lg:order-1' : ''}`}>
                <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-[380px] object-cover rounded-lg shadow-[0_30px_60px_-25px_rgba(28,27,25,0.3)]"
                />
                <div className="absolute -bottom-5 -right-5 bg-paper rounded-lg px-5 py-4 shadow-[0_16px_40px_-10px_rgba(28,27,25,0.25)] flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-md bg-cream-deep flex items-center justify-center text-xl flex-shrink-0">
                        {feature.stat.icon}
                    </div>
                    <div>
                        <div className="font-display text-lg font-extrabold leading-none text-ink">
                            {feature.stat.num}
                        </div>
                        <div className="text-[11px] text-ink-soft font-semibold">
                            {feature.stat.label}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureRow;
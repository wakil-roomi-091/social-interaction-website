const MoreFeaturesGrid = ({ features }) => {
    return (
        <div className="py-20">
            <div className="text-center mb-12">
                <h2 className="font-display text-[clamp(28px,4vw,42px)] font-semibold tracking-[-1px] text-ink">
                    And the smaller things that{' '}
                    <span className="italic text-moss">add up</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(28,27,25,0.2)]"
                    >
                        <div className="w-12 h-12 rounded-md bg-cream-deep flex items-center justify-center text-2xl mb-5">
                            {feature.icon}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-ink mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-ink-soft leading-relaxed">{feature.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreFeaturesGrid;
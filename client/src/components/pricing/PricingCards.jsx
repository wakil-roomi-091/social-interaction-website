const PricingCards = ({ plans, yearly }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24 max-w-5xl mx-auto">
            {plans.map((plan) => {
                const price = yearly ? plan.price.yearly : plan.price.monthly;

                return (
                    <div
                        key={plan.name}
                        className={`relative rounded-lg p-9 border transition-all duration-300 hover:-translate-y-1.5 ${plan.highlight
                                ? 'bg-moss text-cream border-moss'
                                : 'bg-paper text-ink border-[#1C1B19]/[0.12] hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.15)]'
                            }`}
                    >
                        {plan.badge && (
                            <div className="absolute -top-3.5 right-8 bg-rust text-cream text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-pill">
                                {plan.badge}
                            </div>
                        )}

                        <div className="font-display text-xl font-semibold mb-2">
                            {plan.name}
                        </div>

                        <div className="font-display text-5xl font-bold tracking-tight mb-1">
                            {price === 0 ? '$0' : (
                                <>
                                    <sup className="text-xl font-semibold align-top mr-0.5">$</sup>
                                    {price}
                                </>
                            )}
                        </div>
                        <div className={`text-sm mb-7 ${plan.highlight ? 'text-cream/75' : 'text-ink-soft'}`}>
                            {plan.period}
                        </div>

                        <ul className="space-y-3.5 mb-8">
                            {plan.features.map((feature) => (
                                <li
                                    key={feature}
                                    className={`flex items-center gap-2.5 text-sm ${plan.highlight ? 'text-cream/90' : 'text-ink-soft'
                                        }`}
                                >
                                    <span
                                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${plan.highlight ? 'bg-butter text-ink' : 'bg-cream-deep text-ink'
                                            }`}
                                    >
                                        ✓
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`w-full py-3.5 rounded-pill text-sm font-bold border-2 transition-colors ${plan.highlight
                                    ? 'bg-cream text-ink border-cream hover:bg-butter hover:border-butter'
                                    : 'bg-transparent text-ink border-ink hover:bg-ink hover:text-cream'
                                }`}
                        >
                            {plan.cta}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default PricingCards;
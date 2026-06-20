const PricingSection = () => {
    const plans = [
        {
            name: 'Personal',
            price: '$0',
            period: 'free, forever',
            highlighted: false,
            features: [
                'Unlimited posts & stories',
                'Join unlimited communities',
                'Voice & video messaging',
                'Standard support'
            ],
            buttonText: 'Get started',
            popular: false
        },
        {
            name: 'Creator',
            price: '$9',
            period: 'billed annually',
            highlighted: true,
            features: [
                'Everything in Personal',
                'Audience insights & analytics',
                'Scheduled posts & stories',
                'Verified profile badge'
            ],
            buttonText: 'Start free trial',
            popular: true
        },
        {
            name: 'Community',
            price: '$29',
            period: 'for community leaders',
            highlighted: false,
            features: [
                'Everything in Creator',
                'Advanced moderation tools',
                'Custom community branding',
                'Priority support'
            ],
            buttonText: 'Talk to us',
            popular: false
        }
    ];

    return (
        <section id="pricing" className="px-[5%] py-[110px] max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="flex justify-between items-end gap-10 flex-wrap mb-16">
                <div>
                    <div className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[2px] uppercase text-moss mb-[18px]">
                        <span className="w-7 h-[2px] bg-moss"></span>
                        Pricing
                    </div>
                    <h2 className="font-display text-[clamp(36px,5vw,58px)] font-semibold tracking-[-1.5px] leading-[1.08] text-ink">
                        Free for everyone.<br /><span className="italic text-rust">Extra for creators.</span>
                    </h2>
                </div>
                <p className="text-[17px] text-ink-soft max-w-[380px] leading-relaxed">
                    The core experience is, and always will be, free. Upgrade only if you want extra creator tools.
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`reveal relative border rounded-2xl p-10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,27,25,0.15)] ${plan.highlighted
                                ? 'bg-moss border-moss text-cream'
                                : 'bg-paper border-[rgba(28,27,25,0.12)]'
                            }`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        {/* Most Popular Badge */}
                        {plan.popular && (
                            <div className="absolute -top-3.5 right-8 bg-rust text-white text-[11px] font-bold tracking-[1.5px] uppercase py-1.5 px-4 rounded-pill">
                                Most popular
                            </div>
                        )}

                        {/* Plan Name */}
                        <div className={`font-display text-2xl font-semibold mb-2 ${plan.highlighted ? 'text-cream' : 'text-ink'}`}>
                            {plan.name}
                        </div>

                        {/* Price */}
                        <div className={`font-display text-5xl font-bold tracking-[-1px] ${plan.highlighted ? 'text-cream' : 'text-ink'}`}>
                            {plan.price}
                            {plan.name !== 'Personal' && <sup className="text-xl font-semibold align-top mt-1.5">/mo</sup>}
                        </div>
                        <div className={`text-sm mb-7 ${plan.highlighted ? 'text-[rgba(247,243,236,0.75)]' : 'text-ink-soft'}`}>
                            {plan.period}
                        </div>

                        {/* Features List */}
                        <ul className="list-none flex flex-col gap-3 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className={`flex items-center gap-2.5 text-sm ${plan.highlighted ? 'text-[rgba(247,243,236,0.75)]' : 'text-ink-soft'}`}>
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${plan.highlighted ? 'bg-butter text-ink' : 'bg-cream-deep text-ink'
                                        }`}>✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Button */}
                        <button className={`w-full py-3.5 rounded-pill text-center text-sm font-bold border-2 transition-all duration-250 cursor-pointer font-body ${plan.highlighted
                                ? 'border-cream bg-cream text-ink hover:bg-butter hover:border-butter'
                                : 'border-ink bg-transparent text-ink hover:bg-ink hover:text-cream'
                            }`}>
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
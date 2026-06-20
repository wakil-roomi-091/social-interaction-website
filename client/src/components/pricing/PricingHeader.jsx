const PricingHeader = ({ yearly, setYearly }) => {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[2px] uppercase text-moss mb-5">
                <span className="w-7 h-0.5 bg-moss" />
                Pricing
                <span className="w-7 h-0.5 bg-moss" />
            </div>
            <h1 className="font-display font-semibold text-ink leading-[1.05] tracking-[-1.5px] text-[clamp(36px,5vw,58px)] mb-4">
                Free for everyone.
                <br />
                <span className="italic font-medium text-rust">Extra for creators.</span>
            </h1>
            <p className="text-ink-soft text-base max-w-md mx-auto mb-8">
                The core experience is, and always will be, free. Upgrade only if
                you want extra creator tools.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-paper border border-[#1C1B19]/[0.12] rounded-pill p-1.5">
                <button
                    onClick={() => setYearly(false)}
                    className={`px-5 py-2 rounded-pill text-sm font-bold transition-colors ${!yearly ? 'bg-ink text-cream' : 'text-ink-soft'
                        }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setYearly(true)}
                    className={`px-5 py-2 rounded-pill text-sm font-bold transition-colors flex items-center gap-2 ${yearly ? 'bg-ink text-cream' : 'text-ink-soft'
                        }`}
                >
                    Yearly
                    <span className="bg-butter text-ink text-[10px] font-bold px-2 py-0.5 rounded-pill">
                        Save 25%
                    </span>
                </button>
            </div>
        </div>
    );
};

export default PricingHeader;
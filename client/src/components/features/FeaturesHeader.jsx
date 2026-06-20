const FeaturesHeader = () => {
    return (
        <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[2px] uppercase text-moss mb-5">
                <span className="w-7 h-0.5 bg-moss" />
                Everything inside Socially
                <span className="w-7 h-0.5 bg-moss" />
            </div>
            <h1 className="font-display font-semibold text-ink leading-[1.05] tracking-[-1.5px] text-[clamp(36px,5vw,58px)] max-w-2xl mx-auto">
                Built for the way people{' '}
                <span className="italic font-medium text-rust">actually connect</span>
            </h1>
        </div>
    );
};

export default FeaturesHeader;
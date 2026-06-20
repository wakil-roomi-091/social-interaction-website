const LogoStrip = () => {

    return (
        <div className="px-[5%] py-12 border-t border-b border-[rgba(28,27,25,0.12)] max-w-[1400px] mx-auto">
            <div className="flex items-center justify-center gap-16 flex-wrap">
                {/* Label - takes full width, forces new row */}
                <div className="w-full text-center text-[13px] font-semibold tracking-[2px] uppercase text-ink-soft" style={{ marginBottom: '8px' }}>
                    Featured in
                </div>
                {/* Logos */}
                <div className="font-display text-[22px] font-semibold text-ink-soft opacity-45 transition-opacity duration-250 hover:opacity-90 tracking-[-0.5px]">
                    TechCrunch
                </div>
                <div className="font-display text-[22px] font-semibold text-ink-soft opacity-45 transition-opacity duration-250 hover:opacity-90 tracking-[-0.5px]">
                    The Verge
                </div>
                <div className="font-display text-[22px] font-semibold text-ink-soft opacity-45 transition-opacity duration-250 hover:opacity-90 tracking-[-0.5px]">
                    Wired
                </div>
                <div className="font-display text-[22px] font-semibold text-ink-soft opacity-45 transition-opacity duration-250 hover:opacity-90 tracking-[-0.5px]">
                    Forbes
                </div>
                <div className="font-display text-[22px] font-semibold text-ink-soft opacity-45 transition-opacity duration-250 hover:opacity-90 tracking-[-0.5px]">
                    Product Hunt
                </div>
            </div>
        </div>
    );
};

export default LogoStrip;
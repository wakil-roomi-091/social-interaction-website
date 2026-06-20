const CompareStat = ({ label, personal, creator, community }) => {
    return (
        <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-soft mb-3">
                {label}
            </div>
            <div className="space-y-1.5 text-sm">
                <div className="text-ink-soft">{personal}</div>
                <div className="font-bold text-moss">{creator}</div>
                <div className="text-ink-soft">{community}</div>
            </div>
        </div>
    );
};

const CompareStrip = () => {
    const stats = [
        { label: 'Storage', personal: '5 GB', creator: '100 GB', community: 'Unlimited' },
        { label: 'Analytics history', personal: '—', creator: '12 months', community: 'Unlimited' },
        { label: 'Team seats', personal: '1', creator: '1', community: '5' },
        { label: 'Support response', personal: '48h', creator: '24h', community: '4h' },
    ];

    return (
        <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-8 mb-24 max-w-5xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-ink mb-6 text-center">
                What's different at a glance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {stats.map((stat) => (
                    <CompareStat key={stat.label} {...stat} />
                ))}
            </div>
        </div>
    );
};

export default CompareStrip;
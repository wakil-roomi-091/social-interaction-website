const Stat = ({ num, label }) => {
    return (
        <div>
            <div className="font-display text-xl font-bold text-ink">{num}</div>
            <div className="text-xs text-ink-soft">{label}</div>
        </div>
    );
};

const ProfileStats = ({ stats }) => {
    return (
        <div className="flex gap-8 pb-5 border-b border-[#1C1B19]/[0.08]">
            {stats.map((stat, index) => (
                <Stat key={index} num={stat.num} label={stat.label} />
            ))}
        </div>
    );
};

export default ProfileStats;
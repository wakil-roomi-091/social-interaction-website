const StatsBand = () => {
    const stats = [
        { number: '4.2M', label: 'Daily active users' },
        { number: '12,400', label: 'Active communities' },
        { number: '98%', label: 'Would recommend us' },
        { number: '4.8/5', label: 'App store rating' }
    ];

    return (
        <section className="px-[5%] py-[110px] max-w-[1400px] mx-auto">
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[rgba(28,27,25,0.12)] rounded-2xl overflow-hidden">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`stat-cell py-12 px-8 text-center ${index !== stats.length - 1 ? 'border-r border-[rgba(28,27,25,0.12)]' : ''} sm:${index === 1 ? 'border-r-0' : ''} lg:border-r`}
                    >
                        <div className="font-display text-[clamp(36px,5vw,56px)] font-bold tracking-[-1px] text-ink mb-1.5">
                            {stat.number}
                        </div>
                        <div className="text-sm text-ink-soft font-medium">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsBand;
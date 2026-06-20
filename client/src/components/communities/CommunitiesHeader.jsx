const CommunitiesHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h1 className="font-display text-3xl font-semibold text-ink mb-1">
                    Communities
                </h1>
                <p className="text-ink-soft text-sm">
                    12,400+ active spaces, run by their members
                </p>
            </div>
            <button className="px-6 py-3 rounded-pill bg-ink text-cream text-sm font-bold hover:bg-rust transition-colors w-fit">
                + Start a community
            </button>
        </div>
    );
};

export default CommunitiesHeader;
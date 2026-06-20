const ProfileTabs = ({ activeTab, setActiveTab, tabs }) => {
    return (
        <div className="flex gap-1 pt-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab
                            ? 'text-ink border-rust'
                            : 'text-ink-soft border-transparent hover:text-ink'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default ProfileTabs;
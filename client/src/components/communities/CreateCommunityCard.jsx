const CreateCommunityCard = () => {
    return (
        <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-5 text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-display text-base font-semibold text-ink mb-1">
                Can't find your space?
            </div>
            <p className="text-xs text-ink-soft mb-4">
                Start your own community in under a minute.
            </p>
            <button className="w-full py-2.5 rounded-pill bg-ink text-cream text-xs font-bold hover:bg-rust transition-colors">
                Create community
            </button>
        </div>
    );
};

export default CreateCommunityCard;
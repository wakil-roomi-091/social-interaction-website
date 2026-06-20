const SettingsToggle = ({ title, sub, checked, onChange }) => {
    return (
        <div className="flex items-center justify-between p-3.5 rounded-md border border-[#1C1B19]/[0.1] bg-cream-deep/20">
            <div>
                <div className="text-sm font-semibold text-ink">{title}</div>
                <div className="text-xs text-ink-soft">{sub}</div>
            </div>
            <button
                onClick={onChange}
                className={`relative w-11 h-6 rounded-pill transition-colors flex-shrink-0 ${checked ? 'bg-moss' : 'bg-[#1C1B19]/[0.15]'
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-paper transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
};

export default SettingsToggle;
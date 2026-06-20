const SettingsInput = ({ label, defaultValue, type = 'text' }) => {
    return (
        <div>
            <label className="text-xs font-semibold text-ink-soft mb-1 block">
                {label}
            </label>
            <input
                type={type}
                defaultValue={defaultValue}
                className="w-full px-4 py-2.5 rounded-md border border-[#1C1B19]/[0.12] bg-cream-deep/30 text-sm text-ink outline-none focus:ring-2 focus:ring-moss/30 transition-shadow"
            />
        </div>
    );
};

export default SettingsInput;
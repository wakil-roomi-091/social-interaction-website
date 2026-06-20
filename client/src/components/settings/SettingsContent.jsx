import { useState } from 'react';
import SettingsInput from './SettingsInput';
import SettingsToggle from './SettingsToggle';
import SettingsPlaceholder from './SettingsPlaceholder';

const SettingsContent = ({ active }) => {
    const [toggles, setToggles] = useState({
        email: true,
        twoFactor: false,
        publicProfile: true,
    });

    const toggle = (key) =>
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

    if (active !== 'account') {
        return <SettingsPlaceholder section={active} />;
    }

    return (
        <div className="p-8">
            <h2 className="font-display text-2xl font-semibold text-ink mb-1">
                Account settings
            </h2>
            <p className="text-sm text-ink-soft mb-7">
                Manage your profile and personal information
            </p>

            {/* Avatar upload */}
            <div className="flex items-center gap-4 p-4 rounded-md border border-[#1C1B19]/[0.1] bg-cream-deep/40 mb-7">
                <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=faces"
                    alt=""
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                    <div className="text-sm font-bold text-ink">Profile photo</div>
                    <div className="text-xs text-ink-soft">JPG, PNG or GIF · Max 5MB</div>
                </div>
                <button className="text-xs font-bold border-2 border-moss text-moss rounded-pill px-4 py-2 hover:bg-moss hover:text-cream transition-colors">
                    Upload new
                </button>
            </div>

            {/* Personal info */}
            <div className="mb-7">
                <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">
                    Personal info
                </div>
                <div className="space-y-3">
                    <SettingsInput label="Display name" defaultValue="Abdul Wakil" />
                    <SettingsInput label="Username" defaultValue="@abdul.wakil" />
                    <SettingsInput label="Bio" defaultValue="CS @ UET Peshawar · Full-Stack Dev" />
                    <SettingsInput label="Website" defaultValue="github.com/abdul-wakil" />
                </div>
            </div>

            {/* Toggles */}
            <div className="mb-7">
                <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">
                    Preferences
                </div>
                <div className="space-y-2">
                    <SettingsToggle
                        title="Email notifications"
                        sub="Receive updates via email"
                        checked={toggles.email}
                        onChange={() => toggle('email')}
                    />
                    <SettingsToggle
                        title="Two-factor authentication"
                        sub="Extra security on login"
                        checked={toggles.twoFactor}
                        onChange={() => toggle('twoFactor')}
                    />
                    <SettingsToggle
                        title="Public profile"
                        sub="Anyone can find and follow you"
                        checked={toggles.publicProfile}
                        onChange={() => toggle('publicProfile')}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button className="px-6 py-3 rounded-pill bg-ink text-cream text-sm font-bold hover:bg-rust transition-colors">
                    Save changes
                </button>
                <button className="px-6 py-3 rounded-pill border-2 border-ink text-ink text-sm font-bold hover:bg-cream-deep transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SettingsContent;
import { User, Lock, Eye, Palette, Bell, CreditCard } from 'lucide-react';

const sections = [
    { key: 'account', label: 'Account', icon: User },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'privacy', label: 'Privacy', icon: Eye },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'billing', label: 'Billing', icon: CreditCard },
];

const SettingsSidebar = ({ active, setActive }) => {
    return (
        <div className="border-r border-[#1C1B19]/[0.1] p-4">
            <div className="font-display text-lg font-bold text-ink mb-4 px-2">
                Settings
            </div>
            <nav className="space-y-1">
                {sections.map((s) => {
                    const Icon = s.icon;
                    const isActive = active === s.key;
                    return (
                        <div
                            key={s.key}
                            onClick={() => setActive(s.key)}
                            className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-semibold cursor-pointer transition-colors ${isActive
                                    ? 'bg-cream-deep text-ink'
                                    : 'text-ink-soft hover:bg-cream-deep/50 hover:text-ink'
                                }`}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-rust rounded-r" />
                            )}
                            <Icon className="w-4 h-4" />
                            {s.label}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default SettingsSidebar;
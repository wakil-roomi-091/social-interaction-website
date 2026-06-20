import { User, Lock, Eye, Palette, Bell, CreditCard } from 'lucide-react';

const iconMap = {
    security: Lock,
    privacy: Eye,
    appearance: Palette,
    notifications: Bell,
    billing: CreditCard,
};

const SettingsPlaceholder = ({ section }) => {
    const Icon = iconMap[section] || User;

    return (
        <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-[#1C1B19]/[0.12] rounded-lg">
            <Icon className="w-12 h-12 text-ink-soft/40 mb-3" />
            <div className="font-display text-lg font-semibold text-ink capitalize">
                {section} settings
            </div>
            <p className="text-sm text-ink-soft mt-1">
                This panel is ready to be built out
            </p>
        </div>
    );
};

export default SettingsPlaceholder;
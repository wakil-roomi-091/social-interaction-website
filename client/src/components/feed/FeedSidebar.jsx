import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Home,
    Compass,
    MessageCircle,
    Users,
    Bell,
    User,
    Settings,
    Plus,
} from 'lucide-react';
import { messageAPI, notificationAPI } from '../../services/api';

const SidebarItem = ({ icon: Icon, label, active, badge, to }) => {
    const content = (
        <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold cursor-pointer transition-colors ${active
                ? 'bg-cream-deep text-ink border-l-2 border-rust'
                : 'text-ink-soft hover:bg-cream-deep/60 hover:text-ink'
                }`}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {badge && badge > 0 && (
                <span className="bg-rust text-cream text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                    {badge > 99 ? '99+' : badge}
                </span>
            )}
        </div>
    );

    if (to) {
        return <Link to={to} className="no-underline">{content}</Link>;
    }

    return content;
};

const FeedSidebar = ({ onOpenModal }) => {
    const [messageUnreadCount, setMessageUnreadCount] = useState(0);
    const [notificationUnreadCount, setNotificationUnreadCount] = useState(0);

    // ✅ Fetch unread message count
    const fetchMessageUnreadCount = async () => {
        try {
            const response = await messageAPI.getConversations();
            const convs = response.data.data || [];

            const totalUnread = convs.reduce((sum, conv) => {
                return sum + (conv.unreadCount || 0);
            }, 0);

            if (messageUnreadCount !== totalUnread) {
                console.log('📊 FeedSidebar - Message unread count updated:', totalUnread);
                setMessageUnreadCount(totalUnread);
            }
        } catch (error) {
            console.error('Fetch message unread count error:', error);
        }
    };

    // ✅ Fetch unread notification count
    const fetchNotificationUnreadCount = async () => {
        try {
            const response = await notificationAPI.getUnreadCount();
            const count = response.data.count || 0;
            if (notificationUnreadCount !== count) {
                console.log('📊 FeedSidebar - Notification unread count updated:', count);
                setNotificationUnreadCount(count);
            }
        } catch (error) {
            console.error('Fetch notification unread count error:', error);
        }
    };

    // Make fetch functions available globally for socket updates
    useEffect(() => {
        window.updateNotificationBadge = fetchNotificationUnreadCount;
        window.updateMessageBadge = fetchMessageUnreadCount;
        return () => {
            delete window.updateNotificationBadge;
            delete window.updateMessageBadge;
        };
    }, []);

    // ✅ Poll every 5 seconds for both counts
    useEffect(() => {
        // Initial fetch
        fetchMessageUnreadCount();
        fetchNotificationUnreadCount();

        // Set up polling interval
        const interval = setInterval(() => {
            fetchMessageUnreadCount();
            fetchNotificationUnreadCount();
        }, 5000);

        // Also fetch when tab becomes visible
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log('👁️ FeedSidebar - Tab visible, refreshing');
                fetchMessageUnreadCount();
                fetchNotificationUnreadCount();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="sticky top-8 bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-4">
            <Link to="/" className="font-display text-xl font-bold text-ink mb-6 flex items-center gap-2 no-underline">
                <span className="w-2.5 h-2.5 rounded-full bg-rust -translate-y-2 inline-block" />
                Socially
            </Link>
            <nav className="space-y-1">
                <SidebarItem icon={Home} label="Home" active to="/feed" />
                <SidebarItem icon={Compass} label="Explore" to="/explore" />
                <SidebarItem
                    icon={MessageCircle}
                    label="Messages"
                    badge={messageUnreadCount}
                    to="/messages"
                />
                <SidebarItem icon={Users} label="Communities" to="/communities" />
                <SidebarItem
                    icon={Bell}
                    label="Notifications"
                    badge={notificationUnreadCount}
                    to="/notifications"
                />
                <SidebarItem icon={User} label="Profile" to="/profile" />
                <SidebarItem icon={Settings} label="Settings" to="/settings" />
            </nav>
            <div className="mt-8 pt-6 border-t border-[#1C1B19]/[0.12]">
                <button
                    onClick={onOpenModal}
                    className="w-full py-3 rounded-pill bg-ink text-cream font-bold text-sm hover:bg-rust transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create post
                </button>
            </div>
        </div>
    );
};

export default FeedSidebar;
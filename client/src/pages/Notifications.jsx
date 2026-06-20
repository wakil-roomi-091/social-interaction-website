import { useState, useEffect } from 'react';
import { Bell, CheckCheck, Loader2, Inbox } from 'lucide-react';
import { notificationAPI } from '../services/api';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [markingAll, setMarkingAll] = useState(false);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationAPI.getAll();
            setNotifications(response.data.data || []);
            setUnreadCount(response.data.unreadCount || 0);
        } catch (error) {
            console.error('Fetch notifications error:', error);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await notificationAPI.markAsRead(id);
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? { ...n, read: true } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            toast.error('Failed to mark as read');
        }
    };

    const handleMarkAllAsRead = async () => {
        setMarkingAll(true);
        try {
            await notificationAPI.markAllAsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
            toast.success('All notifications marked as read');
        } catch (error) {
            toast.error('Failed to mark all as read');
        } finally {
            setMarkingAll(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await notificationAPI.delete(id);
            const deleted = notifications.find((n) => n._id === id);
            setNotifications((prev) => prev.filter((n) => n._id !== id));
            if (!deleted?.read) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
            toast.success('Notification deleted');
        } catch (error) {
            toast.error('Failed to delete notification');
        }
    };

    const handleNotificationClick = (notification) => {
        // Mark as read
        if (!notification.read) {
            handleMarkAsRead(notification._id);
        }

        // Navigate to post
        if (notification.post) {
            navigate(`/post/${notification.post._id}`);
        } else if (notification.sender) {
            navigate(`/profile/${notification.sender._id}`);
        }
    };

    const unreadNotifications = notifications.filter((n) => !n.read);
    const readNotifications = notifications.filter((n) => n.read);

    return (
        <div className="bg-cream font-body min-h-screen">
            <div className="max-w-[800px] mx-auto px-[5%] py-8 pt-24">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-full bg-moss/10">
                            <Bell className="w-6 h-6 text-moss" />
                        </div>
                        <div>
                            <h1 className="font-display text-2xl font-semibold text-ink">
                                Notifications
                            </h1>
                            {unreadCount > 0 && (
                                <span className="text-sm text-rust font-medium">
                                    {unreadCount} unread
                                </span>
                            )}
                        </div>
                    </div>

                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            disabled={markingAll}
                            className="flex items-center gap-2 px-4 py-2 rounded-pill bg-ink text-cream text-sm font-medium hover:bg-rust transition-colors disabled:opacity-50"
                        >
                            {markingAll ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <CheckCheck className="w-4 h-4" />
                            )}
                            Mark all as read
                        </button>
                    )}
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-8 h-8 border-4 border-moss border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-ink-soft text-sm">Loading notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-16 bg-paper border border-[#1C1B19]/[0.12] rounded-lg">
                        <Inbox className="w-12 h-12 text-ink-soft/30 mx-auto mb-3" />
                        <p className="text-ink-soft text-sm">No notifications yet</p>
                        <p className="text-ink-soft/50 text-xs mt-1">
                            When someone you follow shares a post, you'll see it here
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {/* Unread */}
                        {unreadNotifications.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-xs font-semibold text-ink-soft/60 uppercase tracking-wider mb-2 px-1">
                                    New ({unreadNotifications.length})
                                </h2>
                                <div className="space-y-1">
                                    {unreadNotifications.map((notification) => (
                                        <div
                                            key={notification._id}
                                            onClick={() => handleNotificationClick(notification)}
                                            className="group flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 bg-cream-deep/40 border-l-4 border-moss hover:bg-cream-deep/60"
                                        >
                                            {/* Avatar */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (notification.sender?._id) {
                                                        navigate(`/profile/${notification.sender._id}`);
                                                    }
                                                }}
                                                className="flex-shrink-0"
                                            >
                                                <img
                                                    src={
                                                        notification.sender?.avatar ||
                                                        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'
                                                    }
                                                    alt=""
                                                    className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-moss/50 transition-all"
                                                />
                                            </button>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-ink font-medium">
                                                        <span className="font-bold">
                                                            {notification.sender?.name || 'Someone'}
                                                        </span>
                                                        {' shared a new post'}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-ink-soft/60 mt-1">
                                                    {formatDistanceToNow(new Date(notification.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </div>

                                                {/* Post preview */}
                                                {notification.post?.content && (
                                                    <div className="mt-2 text-xs text-ink-soft/50 bg-cream-deep/30 p-2 rounded-md truncate">
                                                        {notification.post.content.substring(0, 100)}
                                                        {notification.post.content.length > 100 && '...'}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Delete button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(notification._id);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-cream-deep text-ink-soft hover:text-rust transition-all"
                                            >
                                                <span className="text-xs font-medium">✕</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Read */}
                        {readNotifications.length > 0 && (
                            <div>
                                <h2 className="text-xs font-semibold text-ink-soft/60 uppercase tracking-wider mb-2 px-1">
                                    Earlier ({readNotifications.length})
                                </h2>
                                <div className="space-y-1">
                                    {readNotifications.map((notification) => (
                                        <div
                                            key={notification._id}
                                            onClick={() => handleNotificationClick(notification)}
                                            className="group flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 bg-paper hover:bg-cream-deep/30"
                                        >
                                            {/* Avatar */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (notification.sender?._id) {
                                                        navigate(`/profile/${notification.sender._id}`);
                                                    }
                                                }}
                                                className="flex-shrink-0"
                                            >
                                                <img
                                                    src={
                                                        notification.sender?.avatar ||
                                                        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'
                                                    }
                                                    alt=""
                                                    className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-moss/50 transition-all"
                                                />
                                            </button>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-ink-soft">
                                                        <span className="font-bold text-ink">
                                                            {notification.sender?.name || 'Someone'}
                                                        </span>
                                                        {' shared a new post'}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-ink-soft/60 mt-1">
                                                    {formatDistanceToNow(new Date(notification.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </div>

                                                {/* Post preview */}
                                                {notification.post?.content && (
                                                    <div className="mt-2 text-xs text-ink-soft/50 bg-cream-deep/30 p-2 rounded-md truncate">
                                                        {notification.post.content.substring(0, 100)}
                                                        {notification.post.content.length > 100 && '...'}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Delete button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(notification._id);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-cream-deep text-ink-soft hover:text-rust transition-all"
                                            >
                                                <span className="text-xs font-medium">✕</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
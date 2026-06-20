import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const getIcon = () => {
        switch (notification.type) {
            case 'new_post':
                return <FileText className="w-5 h-5 text-moss" />;
            default:
                return <FileText className="w-5 h-5 text-ink-soft" />;
        }
    };

    const handleClick = () => {
        if (!notification.read) {
            onMarkAsRead?.(notification._id);
        }

        if (notification.post) {
            navigate(`/post/${notification.post._id}`);
        } else if (notification.sender) {
            navigate(`/profile/${notification.sender._id}`);
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        setIsDeleting(true);
        await onDelete?.(notification._id);
        setIsDeleting(false);
    };

    const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
        addSuffix: true,
    });

    return (
        <div
            onClick={handleClick}
            className={`group flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${notification.read
                    ? 'bg-paper hover:bg-cream-deep/30'
                    : 'bg-cream-deep/40 border-l-4 border-moss hover:bg-cream-deep/60'
                }`}
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
                <div className="flex items-start gap-2">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            {getIcon()}
                            <span
                                className={`text-sm ${notification.read ? 'text-ink-soft' : 'text-ink font-medium'
                                    }`}
                            >
                                <span className="font-bold">
                                    {notification.sender?.name || 'Someone'}
                                </span>
                                {' shared a new post'}
                            </span>
                        </div>
                        <div className="text-xs text-ink-soft/60 mt-1">{timeAgo}</div>
                    </div>
                </div>

                {/* Post preview */}
                {notification.post?.content && (
                    <div className="mt-2 text-xs text-ink-soft/50 bg-cream-deep/30 p-2 rounded-md truncate">
                        {notification.post.content.substring(0, 100)}
                        {notification.post.content.length > 100 && '...'}
                    </div>
                )}
                {notification.post?.image && !notification.post.content && (
                    <div className="mt-2">
                        <img
                            src={notification.post.image}
                            alt="Post preview"
                            className="w-16 h-16 object-cover rounded-md"
                        />
                    </div>
                )}
            </div>

            {/* Delete button */}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-cream-deep text-ink-soft hover:text-rust transition-all disabled:opacity-50"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default NotificationItem;
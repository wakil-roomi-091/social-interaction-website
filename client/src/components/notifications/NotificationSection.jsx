import NotificationItem from './NotificationItem';

const NotificationSection = ({ title, items }) => {
    return (
        <div className="mb-7">
            <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3 pb-2 border-b border-[#1C1B19]/[0.1]">
                {title}
            </div>
            <div className="space-y-1">
                {items.map((item) => (
                    <NotificationItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default NotificationSection;
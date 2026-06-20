const ContactItem = ({ contact, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${isActive ? 'bg-cream-deep' : 'hover:bg-cream-deep/50'
                }`}
        >
            <div className="relative flex-shrink-0">
                <img src={contact.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                {/* ✅ Professional online indicator */}
                {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-paper" />
                )}
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-ink truncate">{contact.name}</div>
                    {contact.unreadCount > 0 && (
                        <span className="bg-rust text-cream text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center ml-2">
                            {contact.unreadCount}
                        </span>
                    )}
                </div>
                <div className="text-xs text-ink-soft truncate">{contact.preview}</div>
            </div>
        </div>
    );
};

export default ContactItem;
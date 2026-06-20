import { useEffect, useRef } from 'react';
import { Phone, Video } from 'lucide-react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

const ChatArea = ({ contact, messages, typing, typingUser, conversationId, receiverId, onSendMessage }) => {
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // ✅ Auto-scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-[#1C1B19]/[0.1] flex-shrink-0">
                <img src={contact.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <div className="text-sm font-bold text-ink">{contact.name}</div>
                    <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${contact.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className={contact.online ? 'text-green-600' : 'text-gray-500'}>
                            {contact.online ? 'Online' : 'Offline'}
                        </span>
                        {contact.unreadCount > 0 && (
                            <span className="ml-2 text-rust">
                                · {contact.unreadCount} unread
                            </span>
                        )}
                    </div>
                </div>
                <div className="ml-auto flex gap-2">
                    <button className="w-9 h-9 rounded-full bg-cream-deep hover:bg-moss/10 transition-colors flex items-center justify-center text-ink-soft hover:text-ink">
                        <Phone className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-cream-deep hover:bg-moss/10 transition-colors flex items-center justify-center text-ink-soft hover:text-ink">
                        <Video className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ✅ Messages Area - Scrollable, takes remaining space */}
            <div 
                ref={messagesContainerRef}
                className="flex-1 p-5 space-y-3 overflow-y-auto"
            >
                {messages.length === 0 ? (
                    <div className="text-center text-ink-soft text-sm py-8">
                        No messages yet. Say hello!
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <ChatBubble key={msg._id || index} message={msg} />
                        ))}
                        {typing && (
                            <div className="flex justify-start">
                                <TypingIndicator />
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* ✅ Chat Input - Fixed at bottom, no extra space */}
            <div className="flex-shrink-0">
                <ChatInput 
                    conversationId={conversationId}
                    receiverId={receiverId}
                    onSendMessage={onSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatArea;
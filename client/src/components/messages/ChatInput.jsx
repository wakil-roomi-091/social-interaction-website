import { useState, useRef } from 'react';
import { Send, Smile, Image } from 'lucide-react';
import { getSocket } from '../../services/socket';
import toast from 'react-hot-toast';

const ChatInput = ({ conversationId, receiverId, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const inputRef = useRef(null);

    const handleSend = async () => {
        if (!message.trim() || isSending || !conversationId) {
            return;
        }

        if (!receiverId) {
            console.error('❌ Missing receiverId');
            toast.error('Unable to send: missing receiver');
            return;
        }

        setIsSending(true);
        const text = message.trim();
        setMessage('');

        try {
            const socket = getSocket();
            if (!socket) {
                console.error('❌ Socket not initialized');
                toast.error('Connection error. Please refresh.');
                setIsSending(false);
                return;
            }

            socket.emit('send-message', {
                conversationId,
                receiverId,
                text,
                image: '',
            });

            if (onSendMessage) {
                onSendMessage(text);
            }
        } catch (error) {
            console.error('❌ Send message error:', error);
            toast.error('Failed to send message');
            setMessage(text);
        } finally {
            setIsSending(false);
        }
    };

    const handleTyping = (e) => {
        const value = e.target.value;
        setMessage(value);

        const socket = getSocket();
        if (socket && conversationId && receiverId && value.trim()) {
            socket.emit('typing', {
                conversationId,
                receiverId,
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        // ✅ Removed extra padding, only border-top and tight padding
        <div className="border-t border-[#1C1B19]/[0.1] px-4 py-3 flex gap-3 items-center bg-paper">
            <button className="text-ink-soft hover:text-ink transition-colors flex-shrink-0">
                <Image className="w-5 h-5" />
            </button>
            <button className="text-ink-soft hover:text-ink transition-colors flex-shrink-0">
                <Smile className="w-5 h-5" />
            </button>
            <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-cream-deep rounded-pill px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-moss/30 placeholder:text-ink-soft"
            />
            <button
                onClick={handleSend}
                disabled={!message.trim() || isSending}
                className="w-10 h-10 rounded-full bg-moss text-cream flex items-center justify-center hover:bg-rust transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Send className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ChatInput;
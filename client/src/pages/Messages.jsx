import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import BackButton from '../components/common/BackButton';
import ContactList from '../components/messages/ContactList';
import ChatArea from '../components/messages/ChatArea';
import ProfileSidePanel from '../components/messages/ProfileSidePanel';
import { messageAPI } from '../services/api';
import { getSocket } from '../services/socket';
import toast from 'react-hot-toast';

const Messages = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [contacts, setContacts] = useState([]);
    const [activeContactIndex, setActiveContactIndex] = useState(0);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typing, setTyping] = useState(false);
    const [typingUser, setTypingUser] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const typingTimeoutRef = useRef(null);
    const socketRef = useRef(null);
    const messageIdsRef = useRef(new Set());
    const tempMessageIdRef = useRef(null);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const loadConversations = async () => {
        try {
            setLoading(true);
            const response = await messageAPI.getConversations();
            const convs = response.data.data || [];

            const formattedContacts = convs.map((conv) => {
                const otherUser = conv.participants?.find(
                    p => p._id !== currentUser._id
                ) || conv.otherUser;

                return {
                    _id: conv._id,
                    id: conv._id,
                    name: otherUser?.name || 'User',
                    img: otherUser?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
                    preview: conv.lastMessageText || 'No messages yet',
                    online: false,
                    unreadCount: conv.unreadCount || 0,
                    userId: otherUser?._id,
                };
            });

            setContacts(formattedContacts);

            if (userId) {
                await handleDirectMessage(userId, formattedContacts);
            } else if (formattedContacts.length > 0) {
                loadMessages(formattedContacts[0]._id);
                setActiveContactIndex(0);
            }

            setIsInitialLoad(false);
        } catch (error) {
            console.error('Load conversations error:', error);
            toast.error('Failed to load conversations');
        } finally {
            setLoading(false);
        }
    };

    const handleDirectMessage = async (targetUserId, existingContacts) => {
        try {
            const existingContact = existingContacts.find(c => c.userId === targetUserId);

            if (existingContact) {
                const index = existingContacts.indexOf(existingContact);
                setActiveContactIndex(index);
                loadMessages(existingContact._id);
                return;
            }

            const response = await messageAPI.getOrCreateConversation(targetUserId);
            const conv = response.data.data;

            const otherUser = conv.participants?.find(p => p._id !== currentUser._id);
            const newContact = {
                _id: conv._id,
                id: conv._id,
                name: otherUser?.name || 'User',
                img: otherUser?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
                preview: 'No messages yet',
                online: false,
                unreadCount: 0,
                userId: otherUser?._id,
            };

            setContacts(prev => [newContact, ...prev]);
            setActiveContactIndex(0);
            loadMessages(conv._id);

        } catch (error) {
            console.error('Direct message error:', error);
            toast.error('Failed to start conversation');
        }
    };

    const loadMessages = async (conversationId) => {
        try {
            const response = await messageAPI.getMessages(conversationId);
            const msgs = response.data.data || [];

            messageIdsRef.current = new Set();

            const formattedMessages = msgs.map((msg) => {
                const date = new Date(msg.createdAt);
                const time = date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });

                messageIdsRef.current.add(msg._id);

                return {
                    from: msg.sender?._id === currentUser._id ? 'me' : 'them',
                    senderId: msg.sender?._id,
                    text: msg.text || '',
                    time: time,
                    image: msg.image,
                    _id: msg._id,
                    createdAt: msg.createdAt,
                };
            });

            setMessages(formattedMessages);

            const socket = getSocket();
            if (socket && socket.connected) {
                socket.emit('mark-read', {
                    conversationId,
                    userId: currentUser._id,
                });
                socket.emit('messages-read', {
                    conversationId,
                    userId: currentUser._id,
                });
            }
        } catch (error) {
            console.error('Load messages error:', error);
            toast.error('Failed to load messages');
        }
    };

    const handleSelectContact = (index) => {
        setActiveContactIndex(index);
        const contact = contacts[index];
        if (contact) {
            messageIdsRef.current = new Set();
            loadMessages(contact._id);
        }
    };

    const handleSendMessage = async (text) => {
        if (!activeContact) return;

        const date = new Date();
        const time = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const tempId = 'temp_' + Date.now();
        tempMessageIdRef.current = tempId;

        const optimisticMessage = {
            from: 'me',
            senderId: currentUser._id,
            text: text,
            time: time,
            _id: tempId,
            isTemp: true,
            createdAt: date.toISOString(),
        };

        messageIdsRef.current.add(tempId);
        setMessages(prev => [...prev, optimisticMessage]);

        const socket = await waitForSocket();
        if (socket && socket.connected && activeContact) {
            socket.emit('send-message', {
                conversationId: activeContact._id,
                receiverId: activeContact.userId,
                text: text,
                image: '',
            });
        } else {
            toast.error('Connection error. Please refresh.');
            setMessages(prev => prev.filter(msg => msg._id !== tempId));
            messageIdsRef.current.delete(tempId);
            tempMessageIdRef.current = null;
        }
    };

    useEffect(() => {
        const setupSocket = async () => {
            const socket = await waitForSocket();
            if (!socket) {
                console.warn('⚠️ Socket not available');
                return;
            }

            socketRef.current = socket;

            const handleNewMessage = (message) => {
                // ✅ Skip if this is the sender's own message (handled by message-sent)
                if (message.sender?._id === currentUser._id) {
                    console.log('💬 Own message via socket, skipping');
                    return;
                }

                if (messageIdsRef.current.has(message._id)) {
                    console.log('💬 Message already exists, skipping');
                    return;
                }

                const date = new Date(message.createdAt);
                const time = date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });

                const formattedMessage = {
                    from: 'them',
                    senderId: message.sender?._id,
                    text: message.text || '',
                    time: time,
                    image: message.image,
                    _id: message._id,
                    createdAt: message.createdAt,
                };

                messageIdsRef.current.add(message._id);

                setMessages(prev => {
                    const exists = prev.some(msg => msg._id === message._id);
                    if (exists) return prev;
                    return [...prev, formattedMessage];
                });

                setContacts(prev =>
                    prev.map(contact =>
                        contact._id === message.conversation
                            ? {
                                ...contact,
                                preview: message.text || '📷 Image',
                                unreadCount: (contact.unreadCount || 0) + 1,
                            }
                            : contact
                    )
                );
            };

            const handleMessageSent = (message) => {
                const tempId = tempMessageIdRef.current;
                if (!tempId) return;

                setMessages(prev => {
                    const tempIndex = prev.findIndex(msg => msg._id === tempId);
                    if (tempIndex === -1) return prev;

                    const date = new Date(message.createdAt);
                    const time = date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });

                    const realMessage = {
                        from: 'me',
                        senderId: message.sender?._id,
                        text: message.text || '',
                        time: time,
                        image: message.image,
                        _id: message._id,
                        createdAt: message.createdAt,
                    };

                    messageIdsRef.current.delete(tempId);
                    messageIdsRef.current.add(message._id);
                    tempMessageIdRef.current = null;

                    const newMessages = [...prev];
                    newMessages[tempIndex] = realMessage;
                    return newMessages;
                });
            };

            const handleUserTyping = (data) => {
                const activeContact = contacts[activeContactIndex];
                if (activeContact && data.conversationId === activeContact._id) {
                    setTyping(true);
                    setTypingUser('typing...');
                    clearTimeout(typingTimeoutRef.current);
                    typingTimeoutRef.current = setTimeout(() => {
                        setTyping(false);
                        setTypingUser(null);
                    }, 3000);
                }
            };

            const handleUserStoppedTyping = (data) => {
                const activeContact = contacts[activeContactIndex];
                if (activeContact && data.conversationId === activeContact._id) {
                    setTyping(false);
                    setTypingUser(null);
                }
            };

            const handleUserOnline = (data) => {
                setContacts(prev =>
                    prev.map(contact =>
                        contact.userId === data.userId
                            ? { ...contact, online: true }
                            : contact
                    )
                );
            };

            const handleUserOffline = (data) => {
                setContacts(prev =>
                    prev.map(contact =>
                        contact.userId === data.userId
                            ? { ...contact, online: false }
                            : contact
                    )
                );
            };

            socket.on('new-message', handleNewMessage);
            socket.on('message-sent', handleMessageSent);
            socket.on('user-typing', handleUserTyping);
            socket.on('user-stopped-typing', handleUserStoppedTyping);
            socket.on('user-online', handleUserOnline);
            socket.on('user-offline', handleUserOffline);

            return () => {
                socket.off('new-message', handleNewMessage);
                socket.off('message-sent', handleMessageSent);
                socket.off('user-typing', handleUserTyping);
                socket.off('user-stopped-typing', handleUserStoppedTyping);
                socket.off('user-online', handleUserOnline);
                socket.off('user-offline', handleUserOffline);
            };
        };

        setupSocket();
    }, [contacts, activeContactIndex]);

    useEffect(() => {
        loadConversations();
    }, [userId]);

    const activeContact = contacts[activeContactIndex] || null;

    return (
        <div className="bg-cream font-body min-h-screen relative">
            <div className="max-w-[1400px] mx-auto px-[5%] py-8 relative">
                <BackButton label="Back to Feed" to="/feed" />
                <div className="mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_220px] bg-paper border border-[#1C1B19]/[0.12] rounded-lg overflow-hidden min-h-[600px]">
                        {loading && isInitialLoad ? (
                            <div className="flex items-center justify-center p-8 col-span-3">
                                <Loader2 className="w-8 h-8 text-moss animate-spin" />
                            </div>
                        ) : (
                            <>
                                <ContactList
                                    contacts={contacts}
                                    activeContact={activeContactIndex}
                                    setActiveContact={handleSelectContact}
                                />
                                {activeContact ? (
                                    <ChatArea
                                        contact={activeContact}
                                        messages={messages}
                                        typing={typing}
                                        typingUser={typingUser}
                                        conversationId={activeContact._id}
                                        receiverId={activeContact.userId}
                                        onSendMessage={handleSendMessage}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-ink-soft col-span-2">
                                        <div className="text-center">
                                            <p className="text-sm font-medium">No conversations yet</p>
                                            <p className="text-xs mt-1">Start a new conversation</p>
                                        </div>
                                    </div>
                                )}
                                {activeContact && (
                                    <ProfileSidePanel contact={activeContact} />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
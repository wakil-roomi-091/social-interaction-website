import { createContext, useContext, useEffect, useState } from 'react';
import { initializeSocket, getSocket, disconnectSocket } from '../services/socket'; // ✅ Change from .jsx to .js

const SocketContext = createContext(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (token && user?._id) {
            console.log('🔌 SocketProvider - Initializing socket...');
            const newSocket = initializeSocket(user._id);
            setSocket(newSocket);

            if (newSocket) {
                newSocket.on('connect', () => {
                    console.log('🔌 SocketProvider - Socket connected');
                    setIsConnected(true);
                });

                newSocket.on('disconnect', () => {
                    console.log('🔌 SocketProvider - Socket disconnected');
                    setIsConnected(false);
                });

                if (newSocket.connected) {
                    setIsConnected(true);
                }
            }
        }

        return () => {
            disconnectSocket();
            setIsConnected(false);
            setSocket(null);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
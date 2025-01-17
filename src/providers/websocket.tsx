"use client"
import React, { createContext, useContext, useEffect } from 'react';
import { useWebSocketStore } from '@/websocket/service';
import { useAuthStore } from '@/auth/service';
import { WebSocketMessage, WebSocketProviderProps } from '@/types/ws.types';
import { WebSocketContextType } from '@/types/ws.types'
import toast from 'react-hot-toast';

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children,
    enableReconnect = true,
    reconnectAttempts = 2,
    reconnectInterval = 3000,
}) => {
    const { token } = useAuthStore();
    const {
        socket,
        connected: isConnected,
        connecting: isConnecting,
        connect,
        disconnect
    } = useWebSocketStore();

    // Handle initial connection
    useEffect(() => {
        if (token && !socket && !isConnecting) {
            connect(token);
        }
    }, [token, socket, isConnecting]);

    // Handle reconnection
    useEffect(() => {
        if (!enableReconnect || !token || isConnected || isConnecting) return;

        let reconnectCount = 0;
        let reconnectTimer: NodeJS.Timeout;

        const attemptReconnect = () => {
            if (reconnectCount < reconnectAttempts) {
                reconnectTimer = setTimeout(() => {
                    console.log(`Attempting to reconnect (${reconnectCount + 1}/${reconnectAttempts})`);
                    connect(token);
                    reconnectCount++;
                }, reconnectInterval * Math.pow(2, reconnectCount)); // Exponential backoff
            }
        };

        attemptReconnect();

        return () => {
            clearTimeout(reconnectTimer);
        };
    }, [token, isConnected, isConnecting, enableReconnect]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, []);

    const sendMessage = (message: WebSocketMessage) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            // Just for now
            // console.error('WebSocket is not connected');
            toast.error('Not connected to server');
            return;
        }
        socket.send(JSON.stringify(message));
    };

    const value = {
        sendMessage,
        isConnected,
        isConnecting
    };

    return (
        <WebSocketContext.Provider value={value} >
            {children}
        </WebSocketContext.Provider>
    );
};
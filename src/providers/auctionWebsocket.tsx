import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useWebSocket } from './websocket';
import { AuctionWebSocketContextType, AuctionWebSocketProviderProps } from '@/types/ws.types';

const AuctionWebSocketContext = createContext<AuctionWebSocketContextType | null>(null);

export const useAuctionWebSocket = () => {
    const context = useContext(AuctionWebSocketContext);
    if (!context) {
        throw new Error('useAuctionWebSocket must be used within an AuctionWebSocketProvider');
    }
    return context;
};

export const AuctionWebSocketProvider: React.FC<AuctionWebSocketProviderProps> = ({
    children,
    auctionId,
    onNewBid,
    onAuctionUpdate,
}) => {

    const { sendMessage, isConnected } = useWebSocket();

    const joinAuction = useCallback((id: number) => {
        sendMessage({
            type: 'JOIN_ROOM',
            auctionId: id,
        });
    }, [sendMessage]);

    const leaveAuction = useCallback((id: number) => {
        sendMessage({
            type: 'LEAVE_ROOM',
            auctionId: id,
        });
    }, [sendMessage]);

    const placeBid = useCallback((id: number, amount: number) => {
        console.log("Sending message.")
        sendMessage({
            type: 'BID',
            auctionId: id,
            amount,
        });
        console.log("Message sent.")
    }, [sendMessage]);

    // Automatically join/leave auction room
    useEffect(() => {
        if (isConnected && auctionId) {
            joinAuction(auctionId);
            return () => leaveAuction(auctionId);
        }
    }, [isConnected, auctionId]);

    const value = {
        joinAuction,
        leaveAuction,
        placeBid,
        currentAuctionId: auctionId,
    };

    return (
        <AuctionWebSocketContext.Provider value={value} >
            {children}
        </AuctionWebSocketContext.Provider>
    );
};
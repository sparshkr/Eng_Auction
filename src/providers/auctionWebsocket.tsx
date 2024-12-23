import React, { createContext, useContext, useEffect, useCallback, useState, useMemo } from 'react';
import { useWebSocket } from './websocket';
import { AuctionWebSocketContextType, AuctionWebSocketProviderProps } from '@/types/ws.types';
import { AuctionWithDetails, Bid } from '@/types/auction.types';
import { ROUTES } from '@/constants';
import { useWebSocketStore } from '@/websocket/service';

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
}) => {
    const [currentAuction, setCurrentAuction] = useState<AuctionWithDetails | null>(null);
    const { sendMessage, isConnected } = useWebSocket();



    // Initial Fetch
    useEffect(() => {
        const fetchAuction = async () => {
            if (auctionId) {
                try {
                    const response = await fetch(ROUTES.AUCTIONS.GET_BY_ID(Number(auctionId)));
                    const data = await response.json();
                    setCurrentAuction(data);
                } catch (error) {
                    console.error('Error fetching auction:', error);
                }
            }
        };
        fetchAuction();
    }, [auctionId]);


    // Function to Set Callbacks from the store
    const setCallbacks = useWebSocketStore(state => state.setCallbacks);

    // Create callback functions
    const updateNewBid = useCallback((bid: Bid) => {
        setCurrentAuction(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                bids: [bid, ...prev.bids]
            };
        });
    }, [currentAuction, setCurrentAuction]);

    const updateFullAuction = useCallback((auction: AuctionWithDetails) => {
        setCurrentAuction(auction);
    }, []);

    // Register callbacks with the store
    useEffect(() => {
        setCallbacks({
            onNewBid: updateNewBid,
            onAuctionUpdate: updateFullAuction
        });
    }, [updateNewBid, updateFullAuction, setCallbacks]);

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
        currentAuction
    };

    return (
        <AuctionWebSocketContext.Provider value={value} >
            {children}
        </AuctionWebSocketContext.Provider>
    );
};
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { WebSocketMessage } from '@/types/ws.types';
import { AuctionWithDetails, Bid } from '@/types/auction.types';
import { useAuthStore } from '@/auth/service';

interface WebSocketStore {
  socket: WebSocket | null;
  connected: boolean;
  connecting: boolean;
  reconnectAttempts: number;
  connect: (token: string) => void;
  disconnect: () => void;
  onAuctionUpdate?: (auction: AuctionWithDetails) => void; // Will be called when auction updates
  onNewBid?: (bid: Bid) => void; // Will be called when new bid arrives
  setCallbacks: (callbacks: {
    onAuctionUpdate?: (auction: AuctionWithDetails) => void;
    onNewBid?: (bid: Bid) => void;
  }) => void;
}

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';
const MAX_RECONNECT_ATTEMPTS = 2;
const RECONNECT_DELAY = 3000;

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  connected: false,
  connecting: false,
  reconnectAttempts: 0,
  // onAuctionUpdate: undefined,
  // onNewBid: undefined,

  setCallbacks: (callbacks) => {
    set({
      onNewBid: callbacks.onNewBid,
      onAuctionUpdate: callbacks.onAuctionUpdate
    });
  },

  connect: (token: string) => {
    if (get().socket?.readyState === WebSocket.OPEN) return;

    set({ connecting: true });
    const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      set({ socket: ws, connected: true, connecting: false, reconnectAttempts: 0 });
      toast.success('Connected to auction server');
    };

    ws.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      set({ socket: null, connected: false, connecting: false });

      if (get().reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        setTimeout(() => {
          set(state => ({ reconnectAttempts: state.reconnectAttempts + 1 }));
          get().connect(token);
        }, RECONNECT_DELAY * Math.pow(2, get().reconnectAttempts)); // Exponential backoff
      } else {
        toast.error('Connection lost. Please refresh the page.');
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('Connection error occurred');
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        handleWebSocketMessage(data, get());
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, connected: false });
    }
  },
}));

function handleWebSocketMessage(data: WebSocketMessage, store: WebSocketStore) {
  try {
    switch (data.type) {
      case 'NEW_BID':
        if (data.bid) {
          store.onNewBid?.(data.bid);
          toast.success(`New bid placed: $${data.bid.amount}`);
        }
        break;

      case 'BID_CONFIRMED':
        toast.success(data.message || 'Bid placed successfully');
        if (data.bid) {
          store.onNewBid?.(data.bid);
        }
        break;

      case 'AUCTION_START':
        toast.success(data.message || 'Auction has started');
        // if (data.auction) {
        //   store.onAuctionUpdate?.(data.auction);
        // }
        break;

      case 'AUCTION_END':
        const { user } = useAuthStore();
        if (user?.name == data?.winner?.name)
          toast(`Auction ended! You won`, { icon: '🏆' });
        else
          toast(`Auction ended! Winner: ${data.winner?.name}`, { icon: '🏆' });
        // if (data.auction) {
        //   store.onAuctionUpdate?.(data.auction);
        // }
        break;

      case 'ERROR':
        toast.error(data.message || 'An error occurred');
        break;

      case 'DISCONNECTED':
        toast.error(data.message || 'Disconnected from server');
        break;
    }
  } catch (error) {
    console.error('Error handling WebSocket message:', error);
  }
}

// src/lib/websocket/websocket.service.ts
import { create } from 'zustand';
import { toast } from 'react-hot-toast';

interface WebSocketStore {
  socket: WebSocket | null;
  connected: boolean;
  connecting: boolean;
  reconnectAttempts: number;
  connect: (token: string) => void;
  disconnect: () => void;
  joinAuction: (auctionId: number) => void;
  leaveAuction: (auctionId: number) => void;
  placeBid: (auctionId: number, amount: number) => void;
}

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  connected: false,
  connecting: false,
  reconnectAttempts: 0,

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
        }, RECONNECT_DELAY);
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
        handleWebSocketMessage(data);
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

  joinAuction: (auctionId: number) => {
    const { socket, connected } = get();
    if (!socket || !connected) {
      toast.error('Not connected to server');
      return;
    }

    socket.send(JSON.stringify({
      type: 'JOIN_ROOM',
      auctionId
    }));
  },

  leaveAuction: (auctionId: number) => {
    const { socket, connected } = get();
    if (!socket || !connected) return;

    socket.send(JSON.stringify({
      type: 'LEAVE_ROOM',
      auctionId
    }));
  },

  placeBid: (auctionId: number, amount: number) => {
    const { socket, connected } = get();
    if (!socket || !connected) {
      toast.error('Not connected to server');
      return;
    }

    socket.send(JSON.stringify({
      type: 'BID',
      auctionId,
      amount
    }));
  },
}));

// Message handler function
function handleWebSocketMessage(data: WebSocketMessage) {
  switch (data.type) {
    case 'NEW_BID':
      toast.success(`New bid placed: $${data.bid?.amount}`);
      break;
    
    case 'BID_CONFIRMED':
      toast.success(data.message || 'Bid placed successfully');
      break;
    
    case 'AUCTION_START':
      toast.success(data.message || 'Auction has started');
      break;
    
    case 'AUCTION_END':
      toast(
        `Auction ended! Winner: ${data.winner?.name}`,
        { icon: '🏆' }
      );
      break;
    
    case 'ERROR':
      toast.error(data.message || 'An error occurred');
      break;
    
    case 'DISCONNECTED':
      toast.error(data.message || 'Disconnected from server');
      break;
  }
}
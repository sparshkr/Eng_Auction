import { Auction, Bid, Product, User } from './other';


export type WebSocketMessageType =
  | 'JOIN_ROOM'
  | 'LEAVE_ROOM'
  | 'BID'
  | 'NEW_BID'
  | 'BID_CONFIRMED'
  | 'AUCTION_START'
  | 'AUCTION_END'
  | 'ROOM_JOINED'
  | 'ROOM_LEFT'
  | 'ERROR'
  | 'DISCONNECTED';

export interface WebSocketMessage {
  type: WebSocketMessageType;
  auctionId?: number;
  bidderId?: number;
  amount?: number;
  bid?: Bid;
  message?: string;
  auction?: Auction;
  winner?: User;
  winningBid?: Bid;
}

export interface WebSocketContextType {
  sendMessage: (message: WebSocketMessage) => void;
  isConnected: boolean;
  isConnecting: boolean;
}

export interface AuctionWebSocketContextType {
  joinAuction: (auctionId: number) => void;
  leaveAuction: (auctionId: number) => void;
  placeBid: (auctionId: number, amount: number) => void;
  currentAuctionId?: number;
}

export interface AuctionWebSocketProviderProps {
  children: React.ReactNode;
  auctionId?: number;
  onNewBid?: (bid: Bid) => void;
  onAuctionUpdate?: (auction: Auction) => void;
}

export interface WebSocketProviderProps {
  children: React.ReactNode;
  enableReconnect?: boolean;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

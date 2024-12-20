import { Auction, AuctionWithDetails, Bid, Product, User } from '@/types/auction.types';


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
  auction?: AuctionWithDetails;
  winner?: User;
  winningBid?: Bid;
}

export interface WebSocketContextType {
  sendMessage: (message: WebSocketMessage) => void;
  isConnected: boolean;
  isConnecting: boolean;
  // onAuctionUpdate?: (auction: AuctionWithDetails) => void;
  // onNewBid?: (bid: Bid) => void;
}

export interface AuctionWebSocketContextType {
  joinAuction: (auctionId: number) => void;
  leaveAuction: (auctionId: number) => void;
  placeBid: (auctionId: number, amount: number) => void;
  currentAuctionId?: number;
  currentAuction: AuctionWithDetails | null;  // Added
  // updateAuctionState: (bid: Bid) => void;  // Added
  // updateFullAuction: (auction: AuctionWithDetails) => void;  // Added
}

export interface AuctionWebSocketProviderProps {
  children: React.ReactNode;
  auctionId?: number;
  // onNewBid?: (bid: Bid) => void;
  // onAuctionUpdate?: (auction: AuctionWithDetails) => void;
}

export interface WebSocketProviderProps {
  children: React.ReactNode;
  enableReconnect?: boolean;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

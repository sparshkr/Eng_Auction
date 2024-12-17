import { Auction, Bid, User } from '@prisma/client';

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

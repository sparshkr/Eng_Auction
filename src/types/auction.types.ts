// Enums
export enum BidType {
    OPEN = 'OPEN',
    SEALED = 'SEALED'
  }
  
  export enum AuctionType {
    ENGLISH = 'ENGLISH',
    VICKERY = 'VICKERY',
    THE_LAST_PLAY = 'THE_LAST_PLAY',
    HIGHEST_UNIQUE = 'HIGHEST_UNIQUE',
    LOWEST_UNIQUE = 'LOWEST_UNIQUE',
    DUTCH = 'DUTCH'
  }
  
  export enum WinningCondition {
    HIGHEST_BID = 'HIGHEST_BID',
    LOWEST_BID = 'LOWEST_BID'
  }
  
  // Base Types
  export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    photoUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Bid {
    id: number;
    auctionId: number;
    bidderId: number;
    amount: number;
    timeStamp: Date;
    bidder?: User;
  }
  
  export interface Auction {
    id: number;
    name: string;
    auctionType: AuctionType;
    creatorId: number;
    productId: number;
    createdAt: Date;
    auctionStartTime: Date;
    winningCondition: WinningCondition;
    auctionEndTime?: Date;
    maxBids?: number;
    bidType: BidType;
    reservePrice: number;
    registrationFees: number;
    earnestMoneyRequired: boolean;
    earnestMoneyDeposit?: number;
    registrations: number;
    powerPlay: boolean;
    auctionEnded: boolean;
    winnerId?: number;
  }
  
  // Extended Types with Relations
  export interface AuctionWithDetails extends Auction {
    bids: Bid[];
    product: Product;
    creator: {
      id: number;
      name: string;
    };
    winner?: User;
  }
  
  export interface BidWithDetails extends Bid {
    auction: Auction;
    bidder: User;
  }
  
  export interface ProductWithAuctions extends Product {
    auctions: Auction[];
  }
  
  export interface UserWithRelations extends User {
    auctions: Auction[];
    bids: Bid[];
    wonAuctions: Auction[];
  }
  
  // API Response Types
  export interface AuctionResponse {
    success: boolean;
    data?: AuctionWithDetails;
    error?: string;
  }
  
  export interface BidResponse {
    success: boolean;
    data?: BidWithDetails;
    error?: string;
  }
  
  export interface AuctionListResponse {
    success: boolean;
    data?: AuctionWithDetails[];
    error?: string;
    total?: number;
    page?: number;
    limit?: number;
  }
  
//   // WebSocket Types
//   export interface WebSocketMessage {
//     type: 'BID_PLACED' | 'AUCTION_ENDED' | 'AUCTION_UPDATED';
//     data: any;
//   }
  
//   export interface BidPlacedMessage extends WebSocketMessage {
//     type: 'BID_PLACED';
//     data: BidWithDetails;
//   }
  
//   export interface AuctionEndedMessage extends WebSocketMessage {
//     type: 'AUCTION_ENDED';
//     data: {
//       auctionId: number;
//       winnerId?: number;
//       winningBid?: number;
//     };
//   }
  
//   export interface AuctionUpdatedMessage extends WebSocketMessage {
//     type: 'AUCTION_UPDATED';
//     data: AuctionWithDetails;
//   }
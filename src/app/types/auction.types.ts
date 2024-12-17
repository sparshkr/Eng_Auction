import { Auction, Bid, User } from '@prisma/client';

export interface AuctionWithDetails extends Auction {
  bids: Bid[];
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
  creator: {
    id: number;
    name: string;
  };
}
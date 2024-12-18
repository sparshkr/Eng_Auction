import { Auction, Bid, Product,User } from '@prisma/client';

export interface AuctionWithDetails extends Auction {
  bids: Bid[];
  product: Product;
  creator: {
    id: number;
    name: string;
  };
}
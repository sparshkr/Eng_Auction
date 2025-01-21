"use client"
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/auth/service';
import Link from 'next/link';
import { AuctionWithDetails } from '@/types/auction.types';
import { ROUTES } from '@/constants';
import { Toaster } from 'react-hot-toast';
import { useWebSocketStore } from '@/websocket/service';

export default function Home() {
    const { user } = useAuthStore();
    const setCurrentUser = useWebSocketStore(state => state.setCurrentUser);
    const [auctions, setAuctions] = useState<AuctionWithDetails[]>([]);

    useEffect(() => {
        fetch(ROUTES.AUCTIONS.GET_ALL)
            .then(res => res.json())
            .then(data => setAuctions(data));
    }, []);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const getAuctionStatus = (auction: AuctionWithDetails) => {
        const now = new Date();
        const startTime = new Date(auction.auctionStartTime as unknown as string);
        const endTime = new Date(auction.auctionEndTime as unknown as string);
        
        if (now < startTime) return 'Coming Soon';
        if (now > endTime || (auction.bids.length >= auction.maxBids!)) return 'Expired';
        return 'Active';
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl text-gray-900 font-bold">Active Auctions</h1>
                        {
                            user ? (
                                <span className='text-gray-600'>Welcome, {user.name}</span>
                            ) : (
                                <Link href="/auth/login" className="text-blue-500 hover:underline">
                                    Login to Bid
                                </Link>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {auctions?.map(auction => (
                            <Link
                                key={auction.id}
                                href={`/auction/${auction.id}`}
                                className="block"
                            >
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                                    <h2 className="text-xl text-gray-700 font-semibold mb-2">#{auction.id}</h2>
                                    <h2 className="text-xl text-gray-700 font-semibold mb-2">{auction.name}</h2>
                                    <p className="text-gray-600 mb-4">{auction.product.name}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-green-600 font-medium">
                                                Starting: ${auction.reservePrice as unknown as number}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Bids: {auction.bids.length}/{auction.maxBids}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <div>Start: {new Date(auction.auctionStartTime as unknown as string).toLocaleString()}</div>
                                            <div>End: {new Date(auction.auctionEndTime as unknown as string).toLocaleString()}</div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <div>Type: {auction.auctionType}</div>
                                            <div>Win Condition: {auction.winningCondition}</div>
                                            <div>Creator: #{auction.creatorId}</div>
                                        </div>
                                        <div className={`text-sm font-medium ${
                                            getAuctionStatus(auction) === 'Active' ? 'text-green-600' :
                                            getAuctionStatus(auction) === 'Coming Soon' ? 'text-blue-600' :
                                            'text-red-600'
                                        } mt-2`}>
                                            {getAuctionStatus(auction)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
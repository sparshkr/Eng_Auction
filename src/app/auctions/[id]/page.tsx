"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/auth/service';
import { AuctionWithDetails } from '@/types/auction.types';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { AuctionWebSocketProvider, useAuctionWebSocket } from '@/providers/auctionWebsocket';
import { url } from 'inspector';
import { ROUTES } from '@/constants';
import { Toaster } from 'react-hot-toast';
import { span } from 'framer-motion/client';

function BidForm() {
    const [amount, setAmount] = useState('');
    const { placeBid, currentAuctionId } = useAuctionWebSocket();
    const { user } = useAuthStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentAuctionId && amount) {
                placeBid(currentAuctionId, Number(amount));
                setAmount('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!user) return null;

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter bid amount"
                    className="flex-1 px-4 py-2 border rounded text-gray-700"
                    step="0.01"
                    min="0"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Place Bid
                </button>
            </div>
        </form>
    );
}

function AuctionDetail() {
    const { id } = useParams();
    const [auction, setAuction] = useState<AuctionWithDetails | null>(null);
    const { placeBid, currentAuctionId, currentAuction } = useAuctionWebSocket();


    useEffect(() => {
        if (id) {
            fetch(ROUTES.AUCTIONS.GET_BY_ID(Number(id))) // @vedant-asati Fix type
                .then(res => res.json())
                .then(data => setAuction(data));
        }
    }, [id]);

    useEffect(() => {
        setAuction(currentAuction);
    }, [currentAuction]);



    if (!auction) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-4">
                <ConnectionStatus />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">{auction?.name}</h1>

                <div className="mb-6">
                    <h2 className="text-xl mb-2 text-gray-800">Product Details</h2>
                    <p className="text-gray-600">{auction?.product?.description}</p>
                    <p className="text-lg font-semibold mt-2 text-gray-400">
                        {/* @vedant-asati Fix the type. */}
                        Reserve Price: ${auction?.reservePrice as unknown as number}
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl mb-2 text-gray-800">Auction Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-800">Type</p>
                            <p className="font-medium text-gray-400">{auction?.auctionType}</p>
                        </div>
                        <div>
                            <p className="text-gray-800">Status</p>
                            <p className="font-medium text-gray-400">
                                {auction?.auctionEnded ? 'Ended' : 'Active'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-800">Start Time</p>
                            <p className="font-medium text-gray-400">
                                {new Date(auction?.auctionStartTime).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-800">End Time</p>
                            <p className="font-medium text-gray-400">
                                {auction?.auctionEndTime
                                    ? new Date(auction?.auctionEndTime).toLocaleString()
                                    : 'Not set'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl mb-2 text-gray-800">Bids</h2>
                    {auction?.bids?.length === 0 ? (
                        <p className="text-gray-600">No bids yet</p>
                    ) : (
                        <div className="space-y-2">
                            {auction?.bids?.map(bid => (
                                <div
                                    key={bid.id}
                                    className="flex justify-between items-center border-b py-2"
                                >
                                    {/* @vedant-asati Fix the type. */}
                                    <span className="font-medium text-green-500">${bid.amount as unknown as number}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(bid.timeStamp).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {
                    new Date(auction.auctionEndTime as unknown as string) < new Date() ? <span className="text-sm text-gray-800">Auction Ended</span> : <BidForm />
                }
            </div>
        </div>
    );
}

export default function AuctionPage() {

    const { id } = useParams();

    if (!id) return null;

    return (
        <AuctionWebSocketProvider auctionId={Number(id)}>
            <Toaster />
            <AuctionDetail />
        </AuctionWebSocketProvider>
    );
}
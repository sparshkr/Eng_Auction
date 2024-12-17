"use client"
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/auth/service';
import Link from 'next/link';
import { AuctionWithDetails } from '@/types/auction.types';
import { ROUTES } from '@/constants';
import { Toaster } from 'react-hot-toast';

export default function Home() {
    const { user } = useAuthStore();
    const [auctions, setAuctions] = useState<AuctionWithDetails[]>([]);

    useEffect(() => {
        fetch(ROUTES.AUCTIONS.GET_ALL)
            .then(res => res.json())
            .then(data => setAuctions(data));
    }, []);

    return (
        <>
            <Toaster />
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl text-gray-900 font-bold">Active Auctions</h1>
                        {user ? (
                            <span>Welcome, {user.name}</span>
                        ) : (
                            <Link href="/auth/login" className="text-blue-500 hover:underline">
                                Login to Bid
                            </Link>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {auctions?.map(auction => (
                            <Link
                                key={auction.id}
                                href={`/auctions/${auction.id}`}
                                className="block"
                            >
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                                    <h2 className="text-xl text-gray-700 font-semibold mb-2">{auction.name}</h2>
                                    <p className="text-gray-600 mb-4">{auction.product.name}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-600 font-medium">
                                            {/* @vedant-asati Fix the type. */}
                                            Starting: ${auction.reservePrice as unknown as number}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Bids: {auction.bids.length}
                                        </span>
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
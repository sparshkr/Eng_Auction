import React, { useState, useCallback, useEffect } from 'react';
import { useSocket } from "./useSocket";
import toast, { Toaster } from 'react-hot-toast';

const Test = () => {
    const socket = useSocket();
    const [auctionId, setAuctionId] = useState<string>("1");
    const [bidderId, setBidderId] = useState<number>(108);
    const [amount, setAmount] = useState<string>("31000");

    const onMessage = useCallback((message: any) => {
        const data = JSON.parse(message?.data);
        console.log("data: ", data);

        switch (data.type) {
            case 'NEW_BID':
                toast(`New bid received: $${data.bid.amount}`, {
                    position: 'top-right',
                    duration: 4000,
                });
                break;
            case 'BID_CONFIRMED':
                toast.success(data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                break;
            case 'ROOM_JOINED':
                toast.success(data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                break;
            case 'ROOM_LEFT':
                toast.success(data.message, {
                    position: 'top-right',
                    duration: 4000,
                });
                break;
        }
    }, []);

    useEffect(() => {
        socket.addEventListener("message", onMessage);
        return () => socket.removeEventListener("message", onMessage);
    }, [socket, onMessage]);

    // Socket Functions
    const joinRoom = () => {
        socket.send(
            JSON.stringify({
                "auctionId": auctionId,
                "type": "JOIN_ROOM"
            })
        );
    }
    const leaveRoom = () => {
        socket.send(
            JSON.stringify({
                "auctionId": auctionId,
                "type": "LEAVE_ROOM"
            })
        );
    }
    const placeBid = (amount: string) => {
        socket.send(
            JSON.stringify({
                "auctionId": auctionId,
                "bidderId": bidderId,
                "amount": amount,
                "type": "BID"
            })
        );
    }

    return (
        <>
            <div>Test</div>
            <button onClick={joinRoom}>join</button>
            <button onClick={() => placeBid(amount)}>bid</button>
            <button onClick={leaveRoom}>leave</button>
            {/* <Toaster /> */}
        </>
    );
}

export default Test;
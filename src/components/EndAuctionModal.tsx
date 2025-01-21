"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/auth/service";
import { ROUTES } from "@/constants";
import { User } from "@/types/auction.types";

interface EndAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  winnerId: number;
  winningBid: number;
}

const EndAuctionModal: React.FC<EndAuctionModalProps> = ({
  isOpen,
  onClose,
  winnerId,
  winningBid,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [winner, setWinner] = useState<User | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // if (!token) return;
    const fetchWinner = async () => {

      try {
        const response = await fetch(`${ROUTES.USERS.GET_BY_ID(winnerId)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch winner details');
        }

        const winnerData = await response.json();
        setWinner(winnerData);
      } catch (error) {
        console.error('Error fetching winner:', error);
      }
    };

    if (winnerId && isOpen && token) {
      fetchWinner();
    }
  }, [winnerId, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 300); // Delay to ensure animation starts
    } else if (isVisible) {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 300); // Match the duration of the animation
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
      setIsVisible(true); // Show modal
      setTimeout(() => setIsAnimating(true), 10); // Start animation
    } else {
      setIsAnimating(false); // Stop animation
      const timer = setTimeout(() => setIsVisible(false), 300); // Match the animation duration
      document.body.style.overflow = ""; // Restore scrolling
      return () => clearTimeout(timer); // Clean up timeout
    }
  }, [isOpen]);

  if (!isVisible) return null;

  console.log("winnerId: ", winnerId);
  console.log("user.Id: ", user?.id);
  console.log("winningBid: ", winningBid);

  const isWinner = user?.id === winnerId;
  const winnerIdDisplay = winner?.name || `#${winnerId}`;


  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-linear backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Desktop Backdrop */}
      <div
        className="hidden md:block absolute inset-0 z-40 transition-opacity duration-300 ease-linear backdrop-blur-xs "
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`absolute bottom-[75px] inset-x-0 ms:fixed ms:bottom-[109px] mu:fixed mu:bottom-[109px] z-50 flex items-end justify-center motion-safe:animate-flip-up motion-safe:transition-height duration-300 ease-in-out ${isAnimating ? "h-[280px] ms:h-[250px]" : "h-0 }"
          } ${isOpen ? "" : "overflow-hidden"}`}
        style={{
          // overflow: "hidden",
          transformOrigin: "top",
        }}
      >
        <div className="w-[85%] ms:w-[80%] mu:w-[78%]">
          <div className="rounded-t-lg bg-gradient-to-tr from-blue-500 via-transparent to-red-500 pb-0 p-[2px] shadow-[5px_5px_50px_rgba(255,255,0,0.1),_-5px_5px_50px_rgba(255,255,0,0.1),_5px_-5px_50px_rgba(255,165,0,0.1),_0px_50px_100px_rgba(255,255,0,0.2)] h-full">
            <div className="relative bg-gradient-to-b from-[#4A038B] to-[#0C0D29] rounded-t-lg p-2 h-full">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-[-36px] ms:top-[-43px] left-1/2 transform -translate-x-1/2 bg-[#B57FEC] bg-opacity-60 rounded-t-lg p-2 ms:p-3 shadow-md"
                aria-label="Close modal"
              >
                <Image
                  src="/images/arrow.png"
                  alt="close"
                  height={20}
                  width={20}
                />
              </button>

              <div className="w-full h-full flex flex-col text-sm justify-center gap-2 items-center text-white">
                {
                  isWinner ? (
                    <>
                      <Image
                        src="/images/youwin.png"
                        alt="YouWin"
                        height={120}
                        width={120}
                        className="ms:w-40 mu:w-44"
                      />
                      <h2 className="font-bold text-lg text-[22px] font-sora mt-2 ms:text-[27px] mu:mb-2 mu:text-[25px]">
                        Congratulations🎉
                      </h2>
                      <p className="text-center md:leading-[1] font-sora text-xs font-extralight ms:text-base ms:px-4 ms:leading-[1] mu:text-[15px] mu:px-8">
                        Fulfilment team will reach out to you on your telegram
                      </p>
                    </>
                  ) : (
                    <>
                      <Image
                        src="/images/youlose.jpg"
                        alt="YouLose"
                        height={120}
                        width={120}
                        className="ms:w-40 mu:w-44"
                      />
                      <h2 className="font-bold text-lg text-[22px] font-sora mt-2 ms:text-[27px] mu:mb-2 mu:text-[25px]">
                        Oops! {winnerIdDisplay} Won.
                      </h2>
                      <p className="text-center md:leading-[1] font-sora text-xs font-extralight ms:text-base ms:px-4 ms:leading-[1] mu:text-[15px] mu:px-8">
                        Better Luck next time.
                      </p>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndAuctionModal;

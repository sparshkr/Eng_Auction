"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface EndAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  winnerName: string;
  winningBid: number;
}

const EndAuctionModal: React.FC<EndAuctionModalProps> = ({
  isOpen,
  onClose,
  winnerName,
  winningBid,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    if (isOpen) {
      setIsVisible(true);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-linear ${
          isOpen
            ? "opacity-100 backdrop-blur-xs"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Desktop Backdrop (inside phone frame) */}
      <div
        className={`hidden md:block absolute inset-0 z-40 transition-opacity duration-300 ease-linear ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: isOpen ? "blur(0.6px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(0.6px)" : "none",
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`absolute inset-x-0 bottom-[74px] ms:bottom-[165px] mu:bottom-[106px] z-50 flex items-end justify-center transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="w-[85%] ms:w-[80%] mu:w-[78%]">
          <div className="rounded-t-lg bg-gradient-to-tr from-blue-500 via-transparent to-red-500 pb-0 p-[2px] shadow-[5px_5px_50px_rgba(255,255,0,0.1),_-5px_5px_50px_rgba(255,255,0,0.1),_5px_-5px_50px_rgba(255,165,0,0.1),_0px_50px_100px_rgba(255,255,0,0.2)] h-52 mu:h-[280px]  ms:h-[250px]">
            <div className="relative bg-gradient-to-b from-[#4A038B] to-[#0C0D29] rounded-t-lg p-2 h-full">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-[-36px]  ms:top-[-43px] left-1/2 transform -translate-x-1/2 bg-[#B57FEC] bg-opacity-60 rounded-t-lg p-2 ms:p-3 shadow-md"
                aria-label="Close modal"
              >
                <Image
                  src="/images/arrow.png"
                  alt="close"
                  height={20}
                  width={20}
                />
              </button>

              <div className="w-full h-full flex flex-col text-sm justify-center gap-2 items-center text-white ">
                <Image
                  src="/images/youwin.png"
                  alt="YouWin"
                  height={120}
                  width={120}
                  className="ms:w-40 mu:w-44"
                />
                <h2 className="font-bold text-lg text-[22px] font-sora mt-2 ms:text-[27px] mu:mb-2 mu:text-[25px]">
                  Congratulations
                </h2>
                <p className="text-center md:leading-[1] font-sora text-xs font-extralight ms:text-base ms:px-4 ms:leading-[1] mu:text-[15px] mu:px-8">
                  Fulfilment team will reach out to you on your telegram
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndAuctionModal;

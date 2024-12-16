import React from "react";
import Image from "next/image";
import "../app/styles/custom-scrollbar.css";
export default function CardOpenBid({
  EMDprice,
  ReservePrice,
  AuctionName,
}: {
  EMDprice: number;
  ReservePrice: number;
  AuctionName: string;
}) {
  return (
    <div className="relative w-[100%] h-full">
      {/* AuctionName overlay */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="py-1 px-3 bg-[#c8a7ea] bg-opacity-60 font-bold text-[10px] mu:text-[12px] rounded-[7px] whitespace-nowrap backdrop-blur-sm">
          {AuctionName}
        </div>
      </div>

      {/* Card with gradient border */}
      <div className="relative h-full w-full bg-gradient-to-r from-blue-500 to-red-600 p-[0.1rem] rounded-t-[30px] rounded-br-[60px] shadow-custom2">
        {/* Inner container for padding */}
        <div className="relative h-full w-full bg-white rounded-t-[30px] rounded-br-[60px] overflow-hidden">
          <Image
            src="/images/AirpodPro.png"
            alt="Product"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* EMD Price */}
      <div className="absolute -bottom-9 left-10 flex flex-col text-[10px] justify-center items-center gap-0 mu:text-[15px] mu:relative mu:left-4 ms:-left-16 ms:top-[0.6rem] mu:top-[1rem] ms:text-[12px]">
        <div className="-mb-1">EMD Paid</div>
        <div>${EMDprice.toFixed(2)}</div>
      </div>

      {/* Reserve Price */}
      <div className="absolute -bottom-9 right-3 flex flex-col text-[10px] justify-center items-center gap-0 mu:text-[15px] mu:relative mu:right-4 ms:left-[5.1rem] mu:top-[-1.7rem] ms:text-[12px] ms:top-[-1.5rem]">
        <div className="-mb-1">Reserve Price</div>
        <div>${ReservePrice.toFixed(2)}</div>
      </div>
    </div>
  );
}

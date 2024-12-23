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
        <div className="py-1 px-3 bg-[#c8a7ea] bg-opacity-60 font-bold text-[10px] ms:text-[12px] mu:text-[13px]  rounded-[7px] whitespace-nowrap backdrop-blur-xs font-manrope">
          {AuctionName}
        </div>
      </div>

      {/* Card with gradient border */}
      <div className="relative h-full w-full bg-gradient-to-r from-blue-500 to-red-600 p-[0.1rem]    rounded-tr-[30px] rounded-br-[60px] mu:rounded-br-[70px] shadow-custom2">
        {/* Inner container for padding */}
        <div className="relative h-full w-full bg-white rounded-tr-[30px] rounded-br-[60px] mu:rounded-br-[70px] overflow-hidden">
          <Image
            src="/images/AirpodPro.png"
            alt="Product"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* EMD Price */}
      <div className="absolute -bottom-8 font-manrope left-9 flex flex-col text-[9px] justify-center items-center gap-0 mu:text-[13px] mu:relative mu:left-[-4.8rem] ms:left-[-4.3rem] ms:top-[0.6rem] mu:top-[0.6rem] ms:text-[12px] font-[800]">
        <div className="-mb-1">EMD Paid</div>
        <div>${parseFloat(EMDprice.toString()).toFixed(2)}</div>
      </div>

      {/* Reserve Price */}
      <div className="absolute font-manrope bottom-[-1.9rem] right-3 flex flex-col text-[9px] justify-center items-center gap-0 mu:text-[13px] mu:relative mu:left-[5.8rem] ms:left-[5.5rem] mu:top-[-1.75rem] ms:text-[12px] ms:top-[-1.45rem] font-[800]">
        <div className="-mb-1">Reserve Price</div>
        <div>${parseFloat(ReservePrice.toString()).toFixed(2)}</div>
      </div>
    </div>
  );
}

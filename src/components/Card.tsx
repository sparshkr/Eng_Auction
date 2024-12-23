import React from "react";
import Image from "next/image";
import "../app/styles/custom-scrollbar.css";

export default function Card({
  EMDprice,
  ReservePrice,
  AuctionName,
}: {
  EMDprice: number;
  ReservePrice: number;
  AuctionName: string;
}) {
  return (
    <div className="relative w-[80%] msx:w-[82%] msx:h-[18em] h-[12.5em] rounded-[50px] mu:rounded-[75px] p-[2px] bg-gradient-to-r from-blue-500 to-red-600 shadow-custom2 mu:h-[20em] mu:w-[80%]">
      <div className="relative w-full h-full rounded-[48px] mu:rounded-[75px] overflow-hidden">
        <Image
          src="/images/AirpodPro.png"
          alt="Airpod Pro"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="py-1 px-3 bg-[#c8a7ea] bg-opacity-60 font-bold text-[10px] ms:text-[12px] mu:text-[14px] rounded-[7px] whitespace-nowrap backdrop-blur-xs">
          {AuctionName}
        </div>
      </div>

      <div className="absolute -bottom-8 md:left-3 flex flex-col text-[10px] justify-center items-center gap-0 mu:text-[14px] mu:relative mu:right-[5.5rem] ms:right-[5.3rem] ms:top-[0.7rem] mu:top-[0.8rem] ms:text-[13px] font-manrope font-[800]">
        <div className="-mb-1 ">EMD Paid</div>
        <div>${parseFloat(EMDprice.toString()).toFixed(2)}</div>
      </div>
      <div className="absolute  -bottom-8 flex flex-col text-[10px] justify-center items-center gap-0 mu:text-[14px] mu:relative mu:left-[6.2rem] ms:left-[6rem] mu:top-[-1.6rem] md:-right-2 ms:text-[13px] ms:top-[-1.5rem] font-manrope font-[800]">
        <div className="-mb-1">Reserve Price</div>
        <div>${parseFloat(ReservePrice.toString()).toFixed(2)}</div>
      </div>
    </div>
  );
}

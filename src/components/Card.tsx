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
        <div className="py-1 px-3 bg-[#c8a7ea] bg-opacity-60 font-bold text-[10px] mu:text-[12px] rounded-[7px] whitespace-nowrap backdrop-blur-xs">
          {AuctionName}
        </div>
      </div>

      <div className="absolute -bottom-9 md:left-1 flex flex-col text-[11px] justify-center items-center gap-0 mu:text-[15px] mu:relative mu:right-[5.3rem] ms:right-[4.9rem] ms:top-[0.7rem] mu:top-[1rem] ms:text-[13px]">
        <div className="-mb-1 ">EMD Paid</div>
        <div>${parseFloat(EMDprice.toString()).toFixed(2)}</div>
      </div>
      <div className="absolute  -bottom-9 flex flex-col text-[11px] justify-center items-center gap-0 mu:text-[15px] mu:relative mu:left-[6.2rem] ms:left-[5.5rem] mu:top-[-1.7rem] md:-right-2 ms:text-[13px] ms:top-[-1.5rem]">
        <div className="-mb-1">Reserve Price</div>
        <div>${parseFloat(ReservePrice.toString()).toFixed(2)}</div>
      </div>
    </div>
  );
}

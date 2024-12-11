import React from "react";
import Image from "next/image";
import "../app/styles/custom-scrollbar.css";
export default function Card({
  EMDprice,
  ReservePrice,
  AuctionName,
}: {
  EMDprice: Number;
  ReservePrice: Number;
  AuctionName: string;
}) {
  return (
    <div className="relative w-[80%] h-[12.5em] rounded-[60px] mu:rounded-[75px] p-[2px] bg-gradient-to-r from-blue-500 to-red-600 shadow-custom2 mu:h-[18em] mu:w-[68%]">
      <div className="relative w-full h-full rounded-[58px] mu:rounded-[75px] overflow-hidden ">
        <Image
          src="/images/AirpodPro.png"
          alt="Airpod Pro"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute left-3 -bottom-9 flex flex-col text-[11px] justify-center items-center gap-0 mu:text-[13px]">
        <div className="absolute left-[30px] py-1 bottom-[14rem] inline-block w-28 text-center bg-[#c8a7ea] bg-opacity-60 font-bold px-2 text-[10px] mu:left-[3.5rem] mu:bottom-[19.2rem] rounded-[7px] mu:text-[12px] mu:px-3 mu:w-[9rem] backdrop-blur-none ">
          {AuctionName}
        </div>
        <div className="relative flex flex-col items-center justify-center mu:left-[3px] mu:top-[15px] mu:text-[15px] md:right-1">
          <div className="-mb-1 ">EMD Paid</div>
          <div>${EMDprice.toString()}.00</div>
        </div>
      </div>
      <div className="absolute  -bottom-9 flex flex-col text-[11px] justify-center items-center gap-0 mu:text-[15px] mu:relative mu:left-24 mu:top-[13px] md:-right-2">
        <div className="-mb-1">Reserve Price</div>
        <div>${ReservePrice.toString()}.00</div>
      </div>
    </div>
  );
}

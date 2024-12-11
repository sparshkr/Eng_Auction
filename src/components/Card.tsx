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
    <div className="relative w-[80%] h-[12.5em] rounded-[60px] mu:rounded-[75px] p-[2px] bg-gradient-to-r from-blue-500 to-red-600 shadow-custom2 mu:h-[18em] mu:w-[78%]">
      <div className="relative w-full h-full rounded-[58px] mu:rounded-[75px] overflow-hidden ">
        <Image
          src="/images/AirpodPro.png"
          alt="Airpod Pro"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute left-3 -bottom-9 flex flex-col text-[11px] justify-center items-center gap-0 mu:text-[13px]">
        <div className="absolute left-[30px] py-1 bottom-[14rem] inline-block w-28 text-center bg-[#c8a7ea] bg-opacity-60 font-bold px-2 text-[10px] mu:left-[3.8rem] mu:bottom-[19.2rem] rounded-[7px] mu:text-[12px] mu:px-3 mu:w-[9rem] backdrop-blur-none ms:left-[3.5rem]">
          {AuctionName}
        </div>
      </div>
      <div className="absolute -bottom-9 md:left-1 flex flex-col text-[11px] justify-center items-center gap-0 mu:text-[15px] mu:relative mu:right-[5.3rem] mu:top-[1rem] ">
        <div className="-mb-1 w-14  p-0 mu:w-20  text-center">EMD Paid</div>
        <div>${EMDprice.toString()}.00</div>
      </div>
      <div className="absolute  -bottom-9 flex flex-col text-[11px] justify-center items-center gap-0 mu:text-[15px] mu:relative mu:left-24 mu:top-[-1.5rem] md:-right-2">
        <div className="-mb-1">Reserve Price</div>
        <div>${ReservePrice.toString()}.00</div>
      </div>
    </div>
  );
}

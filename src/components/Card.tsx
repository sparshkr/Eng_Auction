import React from "react";
import Image from "next/image";
import "../app/styles/custom-scrollbar.css";
export default function Card({
  EMDprice,
  ReservePrice,
}: {
  EMDprice: Number;
  ReservePrice: Number;
}) {
  return (
    <div className="relative w-[80%] h-[13em] rounded-[60px] p-[2px] bg-gradient-to-r from-blue-500 to-red-600 shadow-custom2">
      <div className="relative w-full h-full rounded-[58px] overflow-hidden ">
        <Image
          src="/images/AirpodPro.png"
          alt="Airpod Pro"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute left-3 -bottom-9 flex flex-col text-[11px] justify-center items-center gap-0">
        <div className="-mb-1">EMD Paid</div>
        <div>${EMDprice.toString()}.00</div>
      </div>
      <div className="absolute -right-1 -bottom-9 flex flex-col text-[11px] justify-center items-center gap-0">
        <div className="-mb-1">Reserve Price</div>
        <div>${ReservePrice.toString()}.00</div>
      </div>
    </div>
  );
}

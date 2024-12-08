import React from "react";
import Image from "next/image";

export default function Card() {
  return (
    <div className="relative w-[80%] h-[13em] rounded-[60px] p-[2px] bg-gradient-to-r from-blue-500 to-red-600">
      <div className="relative w-full h-full rounded-[58px] overflow-hidden">
        <Image
          src="/images/AirpodPro.png"
          alt="Airpod Pro"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

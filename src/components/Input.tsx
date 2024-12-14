"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function InputComponent() {
  return (
    <div className="relative w-[110%]   mu:w-[140%] ms:w-[130%] max-w-[600px] h-[42px] m-0 p-0 mu:h-[3.6rem]">
      <input
        type="text"
        placeholder="Enter Your Highest Bid..."
        className="w-full h-full border-t-0 border-b-0 rounded-t-[30px] rounded-b-[60px] p-2 bg-transparent text-center text-white mu:placeholder:text-[16px] ms:placeholder:text-[15px]  placeholder-white mu:placeholder:pr-8 placeholder:-translate-y-1  focus:outline-none relative z-10 md:placeholder:text-[12px] md:placeholder:pr-2 ms:placeholder:translate-x-2 mu:placeholder:translate-x-3 placeholder:font-[580] "
      />
      <div className="absolute inset-0 rounded-t-[30px] rounded-b-[60px] bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 -z-10 p-[1px]">
        <div className="w-full h-full bg-[#0C0D29] rounded-t-[28px] rounded-b-[58px]"></div>
      </div>
      <button
        className="absolute right-1 mu:top-6 mu:right-3 top-[18px] transform -translate-y-1/2 text-4xl text-white z-40"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <ArrowRight />
      </button>
    </div>
  );
}

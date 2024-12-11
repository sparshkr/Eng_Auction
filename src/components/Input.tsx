"use client";

import React from "react";

export default function InputComponent() {
  return (
    <div className="relative w-[120%] msx:w-[120%] ms:w-[130%] mu:w-[140%] max-w-[600px] h-[42px] m-0 p-0 mu:h-[3.6rem]">
      <input
        type="text"
        placeholder="Enter Your Highest Bid..."
        className="w-full h-full border-t-0 border-b-0 rounded-t-[30px] rounded-b-[60px] p-2 bg-transparent text-center text-white mu:placeholder:text-[15px] placeholder:font-[300] placeholder-white mu:placeholder:pr-8 focus:outline-none relative z-10 md:placeholder:text-[12px] md:placeholder:pr-4"
      />
      <div className="absolute inset-0 rounded-t-[30px] rounded-b-[60px] bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 -z-10 p-[1px]">
        <div className="w-full h-full bg-[#0C0D29] rounded-t-[28px] rounded-b-[58px]"></div>
      </div>
      <button
        className="absolute right-1 mu:top-6 mu:right-3 top-[16px] transform -translate-y-1/2 text-4xl text-white z-50"
        onClick={() => {
          console.log("clicked");
        }}
      >
        &rarr;
      </button>
    </div>
  );
}

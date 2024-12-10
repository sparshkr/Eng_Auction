"use client";

import React from "react";

export default function InputComponent() {
  return (
    <div className="relative w-[120%] max-w-[600px] h-[42px] m-0 p-0">
      <input
        type="text"
        placeholder="Enter Your Highest Bid"
        className="w-full h-full border-t-0 border-b-0 rounded-t-[30px] rounded-b-[60px] p-2 bg-transparent text-center text-white placeholder:text-sm placeholder:font-[300] placeholder-white focus:outline-none relative z-10"
      />
      <div className="absolute inset-0 rounded-t-[30px] rounded-b-[60px] bg-gradient-to-t from-blue-500 via-transparent to-pink-500 -z-10 p-[1px]">
        <div className="w-full h-full bg-[#0C0D29] rounded-t-[28px] rounded-b-[58px]"></div>
      </div>
      <button
        className="absolute right-1 top-[16px] transform -translate-y-1/2 text-4xl text-white z-50"
        onClick={() => {
          console.log("clicked");
        }}
      >
        &rarr;
      </button>
    </div>
  );
}

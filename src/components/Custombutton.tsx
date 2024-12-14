import React from "react";

interface CustombuttonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Custombutton({ onClick, children }: CustombuttonProps) {
  return (
    <div className="inline-block h-full w-full">
      <button
        onClick={onClick}
        className="relative px-6 py-2 bg-[#0C0D29] text-white rounded-full focus:outline-none transition-all duration-300 hover:opacity-80 w-full shadow-[0_5px_50px_-12px_rgba(255,253,0,0.5)] h-full"
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 opacity-75 blur-lg"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-transparent to-pink-500"></div>
        <div className="absolute inset-[2px] rounded-full bg-[#0C0D29]"></div>
      </button>
    </div>
  );
}

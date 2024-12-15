import React from "react";

interface CustomDivProps {
  children: React.ReactNode;
}

export default function CustomDiv({ children }: CustomDivProps) {
  return (
    <div className="relative inline-block h-full w-full">
      {/* Outer gradient border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 opacity-75 blur-lg pointer-events-none"></div>

      {/* Second gradient layer */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 pointer-events-none"></div>

      {/* Inner border */}
      <div className="absolute inset-[2px] rounded-lg bg-[#0C0D29] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full px-6 py-[0.25rem] bg-transparent text-white rounded-lg shadow-[0_5px_50px_-12px_rgba(255,253,0,0.5)] text-[0.5rem] bg-white bg-opacity-15">
        {children}
      </div>
    </div>
  );
}

import React from "react";

interface CustomInputProps {
  placeholder: string;
}

export default function CustomInput({ placeholder }: CustomInputProps) {
  return (
    <div className="relative inline-block h-full w-full">
      {/* Outer gradient border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 opacity-75 blur-lg pointer-events-none"></div>

      {/* Second gradient layer */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 pointer-events-none"></div>

      {/* Inner border */}
      <div className="absolute inset-[2px] rounded-lg bg-[#0C0D29] pointer-events-none"></div>

      {/* Input field */}
      <input
        type="number"
        placeholder={placeholder}
        className="relative z-10 w-full h-full px-4 py-[0.25rem] bg-transparent text-white rounded-full focus:outline-none transition-all duration-300 hover:opacity-80 shadow-[0_5px_50px_-12px_rgba(255,253,0,0.5)] appearance-none placeholder:text-[0.5rem] mu:placeholder:text-[0.8rem]"
        style={{
          MozAppearance: "textfield", // Firefox
          WebkitAppearance: "none", // Chrome, Safari, Edge
        }}
      />
    </div>
  );
}

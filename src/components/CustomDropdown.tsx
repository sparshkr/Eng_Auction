import React from "react";

interface CustomDropdownProps {
  options: string[];
  placeholder: string;
}

export default function CustomDropdown({
  options,
  placeholder,
}: CustomDropdownProps) {
  return (
    <div className="relative inline-block h-full w-full">
      {/* Outer gradient border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 opacity-75 blur-lg pointer-events-none"></div>

      {/* Second gradient layer */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 pointer-events-none"></div>

      {/* Inner border */}
      <div className="absolute inset-[2px] rounded-lg bg-[#0C0D29] pointer-events-none"></div>

      {/* Dropdown menu */}
      <div className="relative z-10 w-full h-full">
        <select
          className="relative z-10 w-full h-full px-6 py-[0.25rem] bg-transparent text-white rounded-full focus:outline-none transition-all duration-300 hover:opacity-80 shadow-[0_5px_50px_-12px_rgba(255,253,0,0.5)] appearance-none placeholder:text-[0.5rem] text-[0.5rem]"
          defaultValue=""
        >
          <option value="" disabled hidden className="text-[0.5rem]">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="bg-[#0C0D29] text-white text-[0.5rem]"
            >
              {option}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Icon */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

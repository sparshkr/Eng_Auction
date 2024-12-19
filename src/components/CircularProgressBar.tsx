"use client";

import React from "react";

interface CircularProgressBarProps {
  progress: number;
  time?: string;
  currentHighest: number;
  radius?: number;
}

export default function CircularProgressBar({
  progress,
  time = "10:01:59",
  currentHighest,
  radius: propRadius,
}: CircularProgressBarProps) {
  const size = 30;
  const strokeWidth = 5;
  const center = size / 2;

  const [radius, setRadius] = React.useState(propRadius || 10); // Use prop radius if provided, otherwise default to 10

  React.useEffect(() => {
    if (propRadius) return; // If radius is provided as a prop, don't adjust it

    // Function to determine radius based on breakpoints
    const getRadius = () => {
      if (window.matchMedia("(max-width: 400px)").matches) return 9.5; // 'msx' breakpoint
      if (window.matchMedia("(max-width: 768px)").matches) return 11; // 'mu' breakpoint
      return 10; // Default radius
    };

    setRadius(getRadius()); // Set initial radius

    const handleResize = () => setRadius(getRadius());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [propRadius]);

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const gradientId = `progressGradient-${React.useId()}`;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-20 h-20 mu:w-32 mu:h-[100px]">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 rounded-none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF00FF" />
              <stop offset="100%" stopColor="#3c0266" />
            </linearGradient>
          </defs>

          {/* Dark background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius + strokeWidth / 2}
            fill="white"
            className="p-0 m-0"
          />

          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius + 0.2}
            fill="none"
            stroke="#c9c8c7" // Grey
            strokeWidth={strokeWidth + 1}
          />

          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            style={{
              transition: "stroke-dashoffset 0.35s",
            }}
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#3c0266] rotate-0 font-bold text-[13px] mu:text-[16px] ms:text-[14px]">
            {time}
          </span>
        </div>
      </div>

      {/* Current Highest display */}
      <div className="-mt-1 text-white font-manrope text-[13px] ms:text-[14px] mu:text-[16px] mu:-mt-0 ms:-mt-1">
        ${parseFloat(currentHighest.toString()).toFixed(2)}
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function CircularProgressBar({
  progress,
  time = "10:01:59",
}: {
  progress: number;
  time?: string;
}) {
  const size = 30;
  const strokeWidth = 5;
  const center = size / 2;
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const gradientId = `progressGradient-${React.useId()}`;

  return (
    <div className="relative w-20 h-20">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
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
          r={radius}
          fill="none"
          stroke="#c2bebc" //Grey
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
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.35s",
          }}
        />
      </svg>

      {/* Time display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="  text-[#3c0266] rotate-0 font-bold">{time}</span>
      </div>
    </div>
  );
}

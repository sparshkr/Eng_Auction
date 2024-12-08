import React from "react";

interface PhoneFrameProps {
  AppContent: React.JSX.Element;
}

export default function PhoneFrame({ AppContent }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[580px] max-h-screen w-[300px] flex items-center justify-center">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="relative rounded-[2rem] w-[100%] h-[calc(100%-5px)] bg-white dark:bg-gray-800 overflow-auto">
        {/* Content goes here */}
        {AppContent}
      </div>
    </div>
  );
}

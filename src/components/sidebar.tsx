"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Custombutton from "./Custombutton";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setProfileSection: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({
  isOpen,
  onClose,
  setProfileSection,
  setIsModalOpen,
}: SidebarProps) {
  const [profileButtonLabel, setProfileButtonLabel] = useState("My Profile");

  useEffect(() => {
    const content = document.querySelector(".phone-frame-content");
    if (content) {
      if (isOpen) {
        content.classList.add("overflow-hidden");
        // Change the button label when the sidebar opens
        setProfileButtonLabel("Auction Page");
      } else {
        content.classList.remove("overflow-hidden");
      }
    }

    return () => {
      if (content) {
        content.classList.remove("overflow-hidden");
      }
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-xs z-[60] transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`absolute top-0 right-0 h-full w-64 max-w-[77%] z-[70] transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Sidebar menu"
      >
        {/* Neon border container */}
        <div className="relative h-full w-full overflow-hidden">
          {/* Neon border (left side only) */}
          <div className="absolute left-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-900 via-blue-500 to-blue-600"></div>

          {/* Glow effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-black via-purple-500 to-blue-500 blur-[3px] opacity-75"></div>

          {/* Inner content */}
          <div className="h-full bg-[#1A103C] flex flex-col z-[80] relative ml-[2px]">
            <div className="p-4 flex justify-between items-center">
              <Image
                src="/images/bigdeal.png"
                alt="logo"
                width={120}
                height={120}
              />
              <button
                onClick={onClose}
                aria-label="Close sidebar"
                className="relative bottom-2 bg-[#B57FEC] bg-opacity-50 rounded-md hover:bg-opacity-80 p-1"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <nav className="flex flex-col justify-between flex-grow p-4">
              <div className="flex flex-col gap-6 mu:gap-8 pl-4 font-[600] text-white">
                <button
                  className="text-left text-md mu:text-xl font-medium hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded"
                  onClick={() => {
                    setProfileButtonLabel((currentLabel) =>
                      currentLabel === "My Profile"
                        ? "Auction Page"
                        : "My Profile"
                    );
                    setProfileSection((profileSection) => !profileSection);
                    onClose();
                  }}
                >
                  {profileButtonLabel}
                </button>
                <button
                  className="text-left text-md mu:text-xl font-medium hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded"
                  onClick={() => {
                    onClose();
                    setIsModalOpen(true);
                  }}
                >
                  Buy PLAYs
                </button>
                <button className="text-left text-md mu:text-xl font-medium hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded">
                  PLAY History
                </button>
              </div>

              <div
                className={`relative ${
                  profileButtonLabel === "My Profile"
                    ? "bottom-32"
                    : "md:bottom-10 mu:bottom-28"
                } w-full py-3 mt-8 rounded-lg text-white text-xs font-medium  mu:text-[1rem]`}
              >
                <Custombutton
                  onClick={() => {
                    console.log("Logout from sidebar");
                  }}
                >
                  LOGOUT
                </Custombutton>
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}

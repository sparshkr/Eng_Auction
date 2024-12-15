import React, { useEffect } from "react";

interface Modal2Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal2: React.FC<Modal2Props> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-xs"
        onClick={handleBackdropClick}
      ></div>
      {/* Modal2 Content */}
      <div
        className="relative z-50 w-[100vw] max-w-[95vw] max-h-[90%] pl-2 pr-2 md:-top-16 mu:-top-20 items-center"
        onClick={(e) => e.stopPropagation()} // Prevent clicks from propagating to the backdrop
      >
        <div className="w-[100%] rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 p-[1px] shadow-[5px_5px_50px_rgba(255,255,0,0.1),_-5px_5px_50px_rgba(255,255,0,0.1),_5px_-5px_50px_rgba(255,165,0,0.1),_0px_50px_100px_rgba(255,255,0,0.2)]">
          <div className="relative bg-[#0C0D29] rounded-lg p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-8rem)] msx:max-h-[calc(100vh-2rem)]">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white hover:text-gray-200 rounded-full bg-[#787777] bg-opacity-60 h-6 w-6 flex items-center justify-center"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Modal2 Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;

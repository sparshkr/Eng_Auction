import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 mu:bg-black mu:bg-opacity-50 mu:backdrop-blur-xs"
        onClick={handleBackdropClick}
      ></div>
      <div
        className="relative z-50 max-w-md mu:w-[80%] mu:h-[45%] shadow-[0_0_50px_rgba(255,255,0,0.2)] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent clicks from propagating to the backdrop
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 p-[1px]">
          <div className="relative bg-[#0C0D29] rounded-lg p-6 h-full overflow-y-auto">
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
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import { Dispatch, SetStateAction, useState } from "react";
import { Sidebar } from "./sidebar";
import Image from "next/image"; // Assuming you are using Next.js, adjust if needed

export default function Topbar({
  setProfileSection,
  setIsModalOpen,
}: {
  setProfileSection: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="w-[100%] flex flex-row justify-between items-center pt-2 px-2 text-md mu:px-5 ms:px-3 msx:px-2 ms:text-sm msx:text-xs">
        <button className="bg-[#B57FEC] font-bold rounded-[9px] px-3 text-md top-2  text-white flex bg-opacity-50 py-1 items-center justify-center">
          <Image
            src={"/images/play.png"}
            alt="PLAY"
            width={15}
            height={15}
            className="mu:w-6 mu:h-6"
          />

          <div className="text-[10px] mu:text-[13px] mu:font-[500] font-inter font-[700]">
            5,999
          </div>
        </button>

        <button
          className="bg-[#B57FEC] w-7 h-7 mu:w-10 mu:h-10 flex flex-col justify-evenly items-center rounded-lg top-2 bg-opacity-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
          <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
          <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
        </button>
      </div>

      <Sidebar
        setIsModalOpen={setIsModalOpen}
        setProfileSection={setProfileSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}

// import Image from "next/image";
// export default function Topbar() {
//   const user = undefined;

//   return (
//     <div className="w-[100%] flex flex-row justify-between items-center pt-2 px-2 text-md mu:px-5 ms:px-3 msx:px-2 ms:text-sm msx:text-xs">
//       <button className="bg-[#B57FEC] font-bold rounded-[9px] px-3 text-md top-2  text-white flex bg-opacity-50 py-1 items-center justify-center">
//         <Image
//           src={"/images/play.png"}
//           alt="PLAY"
//           width={15}
//           height={15}
//           className="mu:w-6 mu:h-6"
//         />

//         <div className="text-[10px] mu:text-[13px] mu:font-[500]">5,999</div>
//       </button>

//       <button
//         className="bg-[#B57FEC] w-7 h-7 mu:w-10 mu:h-10 flex flex-col justify-evenly items-center rounded-lg top-2 bg-opacity-50"
//         onClick={() => {
//           console.log("Clicked");
//         }}
//       >
//         <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
//         <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
//         <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
//       </button>
//     </div>
//   );
// }

import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";
import Custombutton from "./Custombutton";

export default function Topbar() {
  const user = undefined;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (user === undefined || user === null) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

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

          <div className="text-[10px] mu:text-[13px] mu:font-[500]">5,999</div>
        </button>

        <button
          className="bg-[#B57FEC] w-7 h-7 mu:w-10 mu:h-10 flex flex-col justify-evenly items-center rounded-lg top-2 bg-opacity-50"
          onClick={openModal}
        >
          <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
          <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
          <span className="block w-3 mu:w-4 border-t-1 border border-white"></span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="h-[100%] w-full  flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 mu:text-md">Log In</h2>

          <div className="flex flex-col gap-3 mu:text-md ms:text-sm">
            <Custombutton
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <div className="flex gap-3 items-center justify-center">
                <Image
                  src="/images/email.png"
                  alt="email"
                  height={20}
                  width={30}
                  className="mu:h-3 mu:w-4"
                />

                <div>LOGIN WITH EMAIL</div>
              </div>
            </Custombutton>
            <Custombutton
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <div className="flex gap-3 items-center justify-center">
                <Image
                  src="/images/phone.png"
                  alt="email"
                  height={20}
                  width={30}
                  className="mu:h-4 mu:w-4"
                />

                <div>LOGIN WITH PHONE NO.</div>
              </div>
            </Custombutton>
            <Custombutton
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <div className="flex gap-3 items-center justify-center">
                <Image
                  src="/images/wallet.png"
                  alt="email"
                  height={20}
                  width={30}
                  className="mu:h-4 mu:w-5"
                />

                <div>LOGIN WITH WALLET</div>
              </div>
            </Custombutton>
            <Custombutton
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <div className="flex gap-3 items-center justify-center">
                <Image
                  src="/images/telegram.png"
                  alt="email"
                  height={20}
                  width={30}
                  className="mu:h-4 mu:w-4"
                />

                <div>LOGIN WITH TELEGRAM</div>
              </div>
            </Custombutton>
          </div>
        </div>
      </Modal>
    </>
  );
}

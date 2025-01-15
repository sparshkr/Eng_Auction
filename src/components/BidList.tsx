import Image from "next/image";
import { Bid, User } from "@/types/auction.types";

interface InputProps {
  bids: Bid[];
}

const BidList = ({ bids }: InputProps) => {
  const user: User = JSON.parse(localStorage.getItem("user") as string);

  return (
    // <<<<<<< HEAD
    //     <div className="flex flex-col justify-center items-center text-white gap-1 font-montserrat font-[500]">
    //       {bids.map((bid, index) => (
    //         <div
    //           key={index}
    //           className={`relative ms:right-5 mu:right-5 flex items-center justify-between text-[0.6rem] ms:text-[0.8rem] mu:text-[0.9rem]  ${
    //             index === 0 ? "text-green-600 font-bold" : "text-white font-normal"
    //           }`}
    //         >
    //           <div className="flex items-center gap-2">
    //             <span>{bid.amount}</span>
    //             {bid.isMine && (
    //               <div className="absolute -right-5 ms:-right-7 mu:-right-8">
    //                 <Image
    //                   src="/images/avatar.png"
    //                   alt="Avatar"
    //                   height={10}
    //                   width={10}
    //                   className="h-3 w-3 ms:h-4 ms:w-4 mu:h-5 mu:w-5"
    //                 />
    //               </div>
    //             )}
    // =======
    <div className="flex flex-col justify-center items-center text-white gap-1 font-montserrat font-[500]">
      {<span className="text-xs justify-end right-0">{bids.length==0 ? "No Bids" : ""}</span>}
      {bids.slice(0, 9)?.map((bid, index) => (
        <div
          key={index}
          className={`relative ms:right-5 mu:right-5 flex items-center justify-between text-[0.6rem] ms:text-[0.8rem] mu:text-[0.9rem]  ${index === 0 ? "text-green-600 font-bold" : "text-white font-normal"
            }`}
        >
          <div className="flex items-center">
            {/* <span className={`${bid?.bidderId == user?.id ? "font-bold" : ""}`}> */}
              ${Number(bid?.amount)}
            {/* </span> */}
            <div className="absolute -right-5 ms:-right-7 mu:-right-8">
              <Image
                src={
                  bid?.bidderId <= 28
                    ? `https://api.auctionx.dev/assets/avatar/${bid?.bidderId}.png`
                    : "/images/avatar.png"
                }
                alt="Avatar"
                height={10}
                width={10}
                className="h-3 w-3 ms:h-4 ms:w-4 mu:h-5 mu:w-5"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidList;

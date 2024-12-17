import Image from "next/image";
import bids from "./bids";

const BidList = () => {
  return (
    <div className="flex flex-col text-white gap-1">
      {bids.map((bid, index) => (
        <div
          key={index}
          className={`relative ms:right-5 mu:right-5 flex items-center justify-between text-[0.6rem] ms:text-[0.8rem] mu:text-[1rem]  ${
            index === 0 ? "text-green-600 font-bold" : "text-white font-normal"
          }`}
        >
          <div className="flex items-center">
            <span>{bid.amount}</span>
            {bid.isMine && (
              <div className="absolute -right-3 ms:-right-4 mu:-right-5">
                <Image
                  src="/images/avatar.png"
                  alt="Avatar"
                  height={10}
                  width={10}
                  className="h-3 w-3 ms:h-4 ms:w-4 mu:h-5 mu:w-5"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidList;

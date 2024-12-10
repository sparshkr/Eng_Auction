import React from "react";
import Image from "next/image";

interface NavItemsProps {
  name: string;
  imgSrc: string;
}

export default function NavBar(): JSX.Element {
  const navItems: Array<NavItemsProps> = [
    {
      name: "Bid",
      imgSrc:
        "https://gvauction.auctionx.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbid-thunder.c1314fdb.png&w=64&q=75",
    },
    {
      name: "MyBids",
      imgSrc:
        "https://gvauction.auctionx.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmy-bids.77a8aebf.png&w=64&q=75",
    },
    {
      name: "Redeem",
      imgSrc:
        "https://gvauction.auctionx.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbidder.59d43e33.png&w=64&q=75",
    },
    {
      name: "How to",
      imgSrc:
        "https://gvauction.auctionx.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhowto.c2aa9712.png&w=64&q=75",
    },
  ];

  return (
    <div className="fixed bottom-16 md:w-[105%] w-[90%] border-2 py-1 px-2 m-0  rounded-[54.88px] h-[94.97px] z-50 bg-[#b7b0b0] bg-opacity-10 text-white border-1 border-[#DFDADA17] md:sticky md:bottom-5 md:left-2 md:h-[50px] ">
      <div className="h-full w-full m-0 pt-2 flex justify-around items-center ">
        {navItems.map((navItem, index) => (
          <button key={index} className="flex flex-col items-center gap-0">
            <div className="h-10 w-[30px] md:h-6 md:w-5 transition-all duration-300 ease-in-out hover:scale-110">
              <Image
                src={navItem.imgSrc}
                alt={navItem.name}
                width={32}
                height={32}
                className=""
              />
            </div>
            <span className="text-sm md:text-[10px]">{navItem.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import Input from "@/components/Input";
import TopBar from "@/components/TopBar";
import Details from "@/components/Details";
import CircularProgressBar from "@/components/CircularProgressBar";
import "./styles/custom-scrollbar.css";

export default function Home() {
  return (
    // <CircularProgressBar progress={70}/>
    <div>
      <div className="relative md:hidden">
        <div className="h-screen w-screen">
          <AppContent />
        </div>
      </div>
      <div className="hidden md:block">
        <PhoneFrame AppContent={<AppContent />} />
      </div>
    </div>
  );
}

const AppContent = () => {
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);
  const AuctionName = "English Auction";
  const ProductName = "AirpodsPro";
  const BasePrice = 1000.0;
  const EMDprice = 200.0;
  const Reserveprice = 500.0;

  useEffect(() => {
    const newAvatarUrls = Array.from(
      { length: 28 },
      (_, i) => `https://api.auctionx.dev/assets/avatar/${i + 1}.png`
    );
    setAvatarUrls(newAvatarUrls);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden md:rounded-[2rem]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A038B] to-[#0C0D29] z-0"></div>

      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/images/download.png')] bg-center bg-cover opacity-30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="relative min-h-full text-white flex flex-col justify-start items-center p-3 gap-5">
          {/* <div className="absolute mu:hidden">Hemlo</div> */}
          <TopBar />
          <div className="w-full mu:mt-4 px-2 mu:px-5 ms:px-3 msx:px-2 ">
            <Details ProductName={ProductName} BasePrice={BasePrice} />
          </div>
          {/* <div className="absolute top-24">{AuctionName}</div> */}
          <Card
            ReservePrice={Reserveprice}
            EMDprice={EMDprice}
            AuctionName={AuctionName}
          />
          <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 z-50 mu:top-[24rem] ">
            <CircularProgressBar progress={59} />
          </div>

          <div className="mu:mt-[3.8rem] flex w-full justify-between mt-8 p-0 m-0 gap-2">
            <div className="relative -left-10  mr-0">
              <Input />
            </div>

            <button className="relative m-0 py-0 h-6 -bottom-2 bg-[#190c3d] flex ml-0 rounded-lg pl-1 gap-1 shadow-custom mu:right-5 ms:right-2 msx:right-1 mu:h-7 mu:top-[0.6rem] mu:gap-[5px] mu:pl-4">
              {/* Button content */}

              <div className="text-[#C0B5FF] text-[10px] mu:text-[12px] relative top-1 mu:right-1 mu:top-[6px] ">
                HINT
              </div>
              <Image
                src={"/images/Bulb.png"}
                alt="png"
                height={20}
                width={20}
                className="relative bottom-0 mu:bottom-2 mu:w-8"
              />
            </button>
          </div>

          <section className="mt-2 flex flex-col gap-2 mb-2 w-full px-3 mu:px-5">
            <h2 className="text-sm text-white mu:text-[15px]">Bidders</h2>
            <div className="flex gap-1 flex-wrap mb-auto justify-start text-sm">
              {avatarUrls.map((url, index) => (
                <Image
                  key={index}
                  className="inline-block rounded-full w-[20px] h-[20px] mu:w-[25px] mu:h-[25px]"
                  src={url}
                  alt={`Avatar ${index + 1}`}
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </section>
          <NavBar />
          <div className="h-12 hidden not-md:max-h-816:block md:hidden"></div>
        </div>
      </div>
    </div>
  );
};

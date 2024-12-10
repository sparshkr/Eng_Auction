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
  const ProductName = "Nike Jordans";
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
      <div className="relative z-20 w-full h-full overflow-y-auto custom-scrollbar">
        <div className="min-h-full text-white flex flex-col justify-start items-center p-3 gap-5">
          <TopBar />
          <Details ProductName={ProductName} BasePrice={BasePrice} />
          <Card ReservePrice={Reserveprice} EMDprice={EMDprice} />
          <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 z-50">
            <CircularProgressBar progress={80} />
          </div>

          <div className="flex w-full justify-between mt-8 p-0 m-0 gap-2">
            <div className="relative -left-10 mr-0">
              <Input />
            </div>

            <button className="relative m-0 py-0 h-6 -bottom-2 bg-[#190c3d] flex ml-0 rounded-lg pl-1 gap-1 shadow-custom">
              {/* Button content */}

              <div className="text-[#C0B5FF] text-[10px] relative top-1">
                HINT
              </div>
              <Image
                src={"/images/Bulb.png"}
                alt="png"
                height={20}
                width={20}
                className="relative bottom-0"
              />
            </button>
          </div>

          <section className="mt-2 flex flex-col gap-2 mb-2 w-full">
            <h2 className="text-sm text-white">Bidders</h2>
            <div className="flex gap-1 flex-wrap mb-auto justify-start text-sm">
              {avatarUrls.map((url, index) => (
                <Image
                  key={index}
                  className="inline-block rounded-full w-[20px] h-[20px]"
                  src={url}
                  alt={`Avatar ${index + 1}`}
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </section>
          <NavBar />
        </div>
      </div>
    </div>
  );
};

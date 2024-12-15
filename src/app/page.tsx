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
import "@fontsource/manrope";
import Custombutton from "@/components/Custombutton";
import Modal from "@/components/modal";
import CustomInput from "@/components/CustomInput";
import CustomDropdown from "@/components/CustomDropdown";
import CustomDiv from "@/components/CustomDiv";
import Modal2 from "@/components/Modal2";
import { div } from "framer-motion/client";
import BidList from "@/components/BidList";

export default function Home() {
  return (
    <div className="font-[500]">
      <div className="relative md:hidden ">
        <div className="h-screen w-screen font-manrope">
          <AppContent />
        </div>
      </div>
      <div className="hidden md:block font-manrope ">
        <PhoneFrame AppContent={<AppContent />} />
      </div>
    </div>
  );
}

const AppContent = () => {
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);
  const [profileSection, setProfileSection] = useState(false);
  const AuctionName = "English Auction";
  const ProductName = "AirpodsPro";
  const BasePrice = 1000.0;
  const EMDprice = 200.0;
  const Reserveprice = 500.0;
  const currentHighest = 999.98;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const AuctionType: string = "openbid";

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const newAvatarUrls = Array.from(
      { length: 28 },
      (_, i) => `https://api.auctionx.dev/assets/avatar/${i + 1}.png`
    );
    setAvatarUrls(newAvatarUrls);
  }, []);

  return (
    <>
      {!profileSection ? (
        <div className="relative w-full h-full overflow-hidden md:rounded-[2rem]">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A038B] to-[#0C0D29] z-0"></div>

          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/images/download.png')] bg-center bg-cover opacity-15 z-10 md:opacity-25"></div>

          {/* Content */}
          <div className="relative z-20 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="relative min-h-full text-white flex flex-col justify-start items-center p-3 gap-5">
              <TopBar setProfileSection={setProfileSection} />
              <div className="w-full mu:mt-4 px-2 mu:px-5 ms:px-3 msx:px-2 ">
                <Details ProductName={ProductName} BasePrice={BasePrice} />
              </div>

              {AuctionType == "closedbid" && (
                <>
                  <Card
                    ReservePrice={Reserveprice}
                    EMDprice={EMDprice}
                    AuctionName={AuctionName}
                  />
                  <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 z-40 msx:top-[24rem] mu:top-[26rem] flex flex-col">
                    <CircularProgressBar
                      currentHighest={currentHighest}
                      progress={59}
                    />
                  </div>
                </>
              )}
              {AuctionType == "openbid" && (
                // <div className="flex border w-full h-full">
                //   <div className="">
                //     <Card
                //       ReservePrice={Reserveprice}
                //       EMDprice={EMDprice}
                //       AuctionName={AuctionName}
                //     />
                //   </div>
                //   <BidList />
                // </div>
                <Card
                  ReservePrice={Reserveprice}
                  EMDprice={EMDprice}
                  AuctionName={AuctionName}
                />
              )}

              <div className="mu:mt-[4.2rem] flex w-full justify-between mt-9 p-0 m-0 gap-2">
                <div className="relative -left-10 ms:-left-11  mr-0">
                  <Input />
                </div>

                <button className="relative m-0 py-0 h-6 -bottom-2 bg-[#190c3d] flex ml-0 rounded-lg pl-1 gap-1 shadow-custom mu:right-5 ms:right-2 msx:right-1 mu:h-7 mu:top-[0.6rem] mu:gap-[5px] mu:pl-4 msx:pl-5">
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

              <section className="-mt-1 flex flex-col gap-2 mb-2 w-full pl-2 pr-0 mu:px-5">
                <h2 className="text-xs text-white mu:text-[15px]">Bidders</h2>
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
      ) : (
        <div className="relative w-full h-full overflow-hidden md:rounded-[2rem]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A038B] to-[#0C0D29] z-0"></div>
          <div className="absolute inset-0 bg-[url('/images/download.png')] bg-center bg-cover opacity-25 z-10"></div>
          <div className="relative z-20 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="relative min-h-full text-white flex flex-col justify-start items-center p-3 gap-2">
              <TopBar setProfileSection={setProfileSection} />
              <div className="w-full text-center mt-5 text-xl md:text-xl font-[500]">
                Profile
              </div>
              <section className=" md:mb-5 pb-5 w-[90%] mu:w-[80%] border-[0.05px] flex flex-col overflow-x-hidden items-center gap-3 rounded-xl bg-white bg-opacity-15 ">
                <div className="w-[80%]  flex  items-center mt-4 gap-4">
                  <Image
                    src={"/images/avatar.png"}
                    alt="Avatar"
                    height={100}
                    width={100}
                    className="h-20 w-20 mu:h-28 mu:w-28 ms:h-20 ms:w-20"
                  />
                  <div className="flex flex-col justify-center ">
                    <div className="text-lg mu:text-3xl flex justify-center items-center gap-2">
                      <div>Bhavya</div>
                      <button>
                        <Image
                          src={"/images/edit.png"}
                          alt="log"
                          height={50}
                          width={50}
                          className="w-[0.85rem] h-[0.85rem] mu:h-4 mu:w-4"
                        />
                      </button>
                    </div>
                    <button className="text-[0.7rem] text-[#B57FEC] flex mu:text-base items-center gap-[0.1rem]">
                      <Image
                        src={"/images/logout.png"}
                        alt="log"
                        height={10}
                        width={10}
                        className="w-3 h-3 mu:w-4 mu:h-4 ms:w-3 ms:h-3"
                      />
                      <div className="underline">Log out</div>
                    </button>
                  </div>
                </div>
                <div className="w-[90%] mx-auto flex flex-col gap-2 mu:text-md ms:text-sm">
                  <div className="flex flex-row items-center justify-around ">
                    <div className="flex flex-col border w-[50%] h-full md:text-xs items-center py-1 md:gap-1">
                      <div className="text-[#B57FEC] h-full">
                        Wallet Address
                      </div>
                      <div>0xcf43...f3a50</div>
                    </div>
                    <div className="flex flex-col border w-[50%] h-full md:text-xs items-center py-1 md:gap-1">
                      <div className="text-[#B57FEC]">Plays</div>
                      <div>5,999</div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-around ">
                    <div className="flex flex-col border w-[50%] h-full md:text-xs items-center py-1 md:gap-1">
                      <div className="text-[#B57FEC]">Referral Code</div>
                      <div>AUCX02</div>
                    </div>
                    <div className="flex flex-col border w-[50%] h-full md:text-xs items-center py-1 md:gap-1">
                      <div className="text-[#B57FEC]">Player ID</div>
                      <div>567535724</div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-around ">
                    <div className="flex flex-col border w-[50%] h-full md:text-xs items-center py-1 md:gap-1">
                      <div className="text-[#B57FEC]">State</div>
                      <div>Gujarat</div>
                    </div>
                    <div className="flex flex-col border w-[50%] h-full md:text-xs items-center py-1 md:gap-1">
                      <div className="text-[#B57FEC]">Country</div>
                      <div>India</div>
                    </div>
                  </div>
                  <div className="mx-4 h-8 mt-1">
                    <Custombutton
                      onClick={() => {
                        console.log(setIsModalOpen(true));
                      }}
                    >
                      <div
                        className="w-full  h-full text-[0.7rem] font-[500] mu:text-[0.85rem] ms:text-[0.7rem]"
                        style={{ wordSpacing: "3px" }}
                      >
                        BUY MORE PLAYS
                      </div>
                    </Custombutton>
                  </div>
                </div>
              </section>
              <NavBar />
            </div>
          </div>
        </div>
      )}
      <Modal2 isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full h-full flex  items-center justify-center">
          <div className="flex flex-col w-[80%]  text-white text-xs justify-center items-center gap-2">
            <h2>BUY PLAYs</h2>
            <section className="text-xs text-center">
              Buy Plays using $Aux Tokens and get 10% Free PLAYS
            </section>
            <div className="flex flex-col justify-center gap-1 w-[80%] ">
              <CustomInput placeholder="Enter Number of PLAYs"></CustomInput>
              <CustomDropdown
                placeholder="Select"
                options={["Option1", "Option2"]}
              ></CustomDropdown>
              <div className="flex">
                <CustomDiv>Amount to be Paid</CustomDiv>
                <div className="absolute flex flex-col text-[0.5rem] w-auto  left-[195px]">
                  <div>USDT</div>
                  <div className="-mt-1 text-[0.4rem]">(1 PLAY = $0.1)</div>
                </div>
              </div>
            </div>
            <div className="w-full h-6 mt-1">
              <Custombutton
                onClick={() => {
                  console.log("Buys PLAYs");
                }}
              >
                <div className="-mt-1 text-[0.6rem]">SUBMIT</div>
              </Custombutton>
            </div>
          </div>
        </div>
      </Modal2>
    </>
  );
};

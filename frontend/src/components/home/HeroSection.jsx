import React, { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="flex w-full justify-around items-center h-[430px] bg-gradient-to-r from-purple-500 to-blue-500 px-4 relative overflow-hidden">
      <FaGear className="absolute text-[#2a366f] opacity-50 text-[20rem] z-0 -left-32 -top-32" />
      <FaGear className="absolute text-[#2a366f] opacity-50 text-[15rem] z-0 -left-32 -bottom-20" />
      <FaGear className="absolute text-[#2a366f] opacity-50 text-[17rem] z-0 -right-32 -top-20" />
      <FaGear className="absolute text-[#2a366f] opacity-50 text-[17rem] z-0 -right-44 -bottom-24" />
      {/* <FaGear className="absolute text-[#2a366f] opacity-50 text-[22rem] z-0 -top-24 left-72" />
      <FaGear className="absolute text-[#2a366f] opacity-50 text-[21rem] z-0 -bottom-44 left-[34rem]" />
      <FaGear className="absolute text-[#2a366f] opacity-50 text-[24rem] z-0 -bottom-60 right-52" />
      <FaGear className="absolute text-[#2a366f] opacity-50 text-[24rem] z-0 -top-40 right-[32rem]" /> */}

      <div className="flex flex-col gap-4 w-auto z-10">
        <div className="text-8xl font-bold text-white drop-shadow-lg">
          <p>Embrace</p>
          <p>Engineering</p>
        </div>
        <div className="flex flex-col text-white font-light text-3xl">
          Share your work to the world
        </div>
        <a
          href="/search"
          className="flex justify-center items-center text-lg rounded-2xl border-2 border-white bg-white font-semibold text-[#6163d4] px-3 py-1 w-1/3 transition duration-300 ease-in-out hover:bg-white hover:text-[#6163d4] hover:scale-110"
        >
          Start now
        </a>
      </div>

      <div className="z-10"></div>
    </div>
  );
};

export default HeroSection;

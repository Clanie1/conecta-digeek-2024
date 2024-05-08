import React, { useEffect, useState } from "react";

const HeroSection = () => {
  return (
    <div className="flex w-full justify-around items-center h-[430px] bg-[#6163d4] px-4">
      <div className="flex flex-col gap-4">
        <div className="text-8xl font-montserrat text-white font-medium">
          <p>Embrace</p>
          <p>Engineering</p>
        </div>
        <div className="flex flex-col text-white font-light text-3xl">
          Share your work to the world
        </div>
        <a
          href="/search"
          className="flex justify-center items-center text-lg rounded-2xl border-2 border-white bg-white font-semibold text-[#6163d4] px-3 py-1 w-1/3 transition duration-300 hover:scale-105 hover:bg-[#6163d4] hover:text-white"
        >
          Start now
        </a>
      </div>
      <div className="flex justify-start items-start"></div>
    </div>
  );
};

export default HeroSection;

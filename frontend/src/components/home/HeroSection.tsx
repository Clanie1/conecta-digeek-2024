import React, { useEffect, useState } from "react";
import SoftwareAnimation from "./animations/software/SoftwareAnimation";

const animations = [
  { type: "Software", component: SoftwareAnimation },
  // { type: "Mecanica", component: MechanicalAnimation },
  // { type: "Mecatronica", component: MechatronicsAnimation },
  // { type: "DisenoGrafico", component: GraphicDesignAnimation },
  // { type: "EnergiasRenovables", component: RenewableEnergyAnimation },
  // { type: "Industrial", component: IndustrialEngineeringAnimation },
];

const getRandomAnimation = () => {
  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[randomIndex].component;
};

const HeroSection = () => {
  const [SelectedAnimation, setSelectedAnimation] = useState(() =>
    getRandomAnimation()
  );

  useEffect(() => {
    const handleReloadAnimation = () => {
      setSelectedAnimation(getRandomAnimation());
    };

    window.addEventListener("load", handleReloadAnimation);
    return () => window.removeEventListener("load", handleReloadAnimation);
  }, []);

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
        <button className="text-lg rounded-2xl border-2 border-white bg-white font-semibold text-[#6163d4] px-3 py-1 w-1/3 transition duration-300 hover:scale-105 hover:bg-[#6163d4] hover:text-white">
          Start now
        </button>
      </div>
      <SelectedAnimation />
    </div>
  );
};

export default HeroSection;

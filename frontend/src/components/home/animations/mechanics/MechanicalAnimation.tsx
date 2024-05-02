import React from "react";
import { FaCog } from "react-icons/fa";
import "./mechanics.css";

const MechanicalAnimation = () => {
  return (
    <div className="hidden lg:flex lg:flex-col justify-center items-center h-[90%] relative w-full">
      <FaCog className="gear small absolute bottom-20" />
      <FaCog className="gear medium absolute right-5 bottom-1" />
      <FaCog className="gear large absolute -top-8" />
    </div>
  );
};

export default MechanicalAnimation;

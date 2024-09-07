import React, { useCallback, useEffect, useState } from "react";
import { BsLink, BsLink45Deg } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { getHeroContent } from "../../services/functions";
import { motion } from "framer-motion";

const SearchHero = () => {
  return (
    <div className="flex w-full justify-left items-center min-h-[200px] md:min-h-[430px] bg-gradient-to-r from-purple-500 to-blue-500 relative overflow-hidden container mx-auto md:rounded-md md:mt-[100px] mt-10 md:px-20 px-5">
      {
        <motion.div
          className="flex flex-col gap-4 w-auto z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-4xl md:text-8xl font-bold text-white drop-shadow-lg">
            Buscar Blogs
          </div>
          <div className="flex flex-col text-white text-xl md:text-3xl">
            Encuentra la informacion mas actualizada
          </div>
        </motion.div>
      }
      <div className="z-10"></div>
    </div>
  );
};

export default SearchHero;

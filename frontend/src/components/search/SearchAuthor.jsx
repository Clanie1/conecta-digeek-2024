import React from "react";
import { motion } from "framer-motion";

const SearchAuthor = ({ author, delay, selected }) => {
  return (
    <motion.div
      className={`flex gap-2 hover:bg-gray-100 p-2 rounded-md transition-colors cursor-pointer w-full flex-initial text-left ${
        selected && "bg-gray-100"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay }}
    >
      <div className="w-[50px] h-[50px] rounded-md">
        <img
          src={author.image}
          alt="placeholder"
          className="bg-contain w-full h-full rounded-md"
        />
      </div>
      <div>
        <h3 className="text-md font-bold">{author.name}</h3>
        <p className="text-sm">{author.titulo}</p>
      </div>
    </motion.div>
  );
};

export default SearchAuthor;

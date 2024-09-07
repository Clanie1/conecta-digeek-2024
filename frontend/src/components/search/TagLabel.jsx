import React from "react";
import { motion } from "framer-motion";

function TagLabel({ tag, delay, disabled = false }) {
  return (
    <motion.div
      className={
        "rounded-full h-fit bg-[#7678FF20] px-6 py-[4px] text-center  font-bold text-xs " +
        (disabled ? "bg-gray-200 text-gray-500 " : " text-[rgb(118,120,255)]")
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay }}
    >
      {tag}
    </motion.div>
  );
}

export default TagLabel;

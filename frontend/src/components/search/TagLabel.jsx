import React from "react";

function TagLabel({ tag, disabled = false }) {
  return (
    <div
      className={
        "rounded-full h-fit bg-[#7678FF20] px-6 py-[4px] text-center  font-bold text-xs " +
        (disabled ? "bg-gray-200 text-gray-500 " : " text-[rgb(118,120,255)]")
      }
    >
      {tag}
    </div>
  );
}

export default TagLabel;

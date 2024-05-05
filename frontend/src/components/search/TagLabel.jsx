import React from "react";

function TagLabel({ tag }) {
  return (
    <div className="rounded-full h-fit bg-[#7678FF20] px-6 py-[4px] text-center text-[#7678FFFF] font-bold text-xs">
      {tag.tags_id.tag}
    </div>
  );
}

export default TagLabel;

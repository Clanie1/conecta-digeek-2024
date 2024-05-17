import React from "react";

const TrendingTags = () => {
  return (
    <div className="flex flex-col justify-start items-center space-y-1 w-1/3">
      <div className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Trending tags
      </div>
      <div className="flex flex-wrap justify-center gap-1"></div>
    </div>
  );
};

export default TrendingTags;

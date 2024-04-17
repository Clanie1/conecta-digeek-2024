import React from "react";
import Tag from "./Tag";

const TrendingTags: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center space-y-1 w-1/3">
      <div className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Trending tags
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        <Tag href="/search?tag=programming" title="Programming" />
        <Tag href="/search?tag=writing" title="Writing" />
        <Tag href="/search?tag=machine-learning" title="Machine Learning" />
        <Tag href="/search?tag=data-science" title="Data Science" />
        <Tag href="/search?tag=self-improvement" title="Self Improvement" />
        <Tag href="/search?tag=productivity" title="Productivity" />
        <Tag href="/search?tag=relationships" title="Relationships" />
        <Tag href="/search?tag=technology" title="Technology" />
        <Tag href="/search?tag=politics" title="Politics" />
      </div>
    </div>
  );
};

export default TrendingTags;

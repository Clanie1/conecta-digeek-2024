import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import Author from "./Author";
import { getAuthors, getFeaturedAuthors } from "../../services/functions";
import LoadingSpinner from "../LoadingSpinner";

const RecommendedTags = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuthors = async () => {
    const authors = await getFeaturedAuthors();
    setAuthors(authors);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="container mx-auto flex flex-col py-8 md:py-2 pb-4 gap-4">
      <h2 className="font-bold text-xl">Autores Recomendados</h2>
      {isLoading && (
        <div className="bg-gray-200 h-[100px] w-full rounded-md animate-pulse"></div>
      )}
      <div className="flex gap-2 flex-wrap">
        {authors.map((author, index) => (
          <Author author={author} delay={index * 0.05} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTags;

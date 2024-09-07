import React, { useEffect } from "react";
import RecommendedPost from "./RecommendedPost";
import { getFeaturedPosts } from "../../services/functions";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";

const RecommendedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const getPosts = useCallback(async () => {
    const posts = await getFeaturedPosts({ author: [], tags: [] });
    console.log("posts", posts);
    setPosts(posts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("fetching");
    getPosts();
  }, []);

  return (
    <div className="container mx-auto flex flex-col pt-10 gap-4">
      <h2 className="font-bold text-xl">Nuestras recomendaciones ✨</h2>
      <div className="flex gap-8 md:gap-2 flex-wrap">
        {loading && (
          <div className="bg-gray-200 h-[380px] w-full rounded-md animate-pulse"></div>
        )}
        {posts.map((post, index) => (
          <RecommendedPost post={post} key={post.id} delay={index * 0.05} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;

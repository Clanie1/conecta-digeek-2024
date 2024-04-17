import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../search/BlogCard.jsx";
import { getFeaturedPosts } from "../../services/functions.ts";

type Post = {
  id: string;
  autor: string;
  status: string;
  created: string;
  image: string;
};

const FeaturedPostsComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getFeaturedBlogs = async () => {
    const response = await getFeaturedPosts([]);
    setPosts(response.data);
  };

  useEffect(() => {
    getFeaturedBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {posts.map((post) => {
        return <BlogCard key={post.id} blog={post} />;
      })}
    </div>
  );
};

export default FeaturedPostsComponent;

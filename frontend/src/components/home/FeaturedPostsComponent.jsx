import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../search/BlogCard.jsx";
import { getFeaturedPosts } from "../../services/functions";

const FeaturedPostsComponent = () => {
  const [posts, setPosts] = useState([]);

  const getFeaturedBlogs = async () => {
    const response = await getFeaturedPosts([]);
    console.log(response.data);
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

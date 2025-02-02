import React from "react";
import { trim } from "../../util/images/utils";
import Tag from "./Tag";
import { motion } from "framer-motion";

const RecommendedPost = ({ post, delay }) => {
  return (
    <motion.a
      className="flex flex-col gap-2 hover:bg-gray-100 md:p-4 rounded-md cursor-pointer transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ delay: delay }}
      href={"/blog/" + post.id}
    >
      <div className="w-full md:w-[200px] h-[200px] rounded-md">
        <img
          src={post.image}
          alt="placeholder"
          className="bg-contain w-full h-full rounded-md bg-si object-cover"
        />
      </div>
      <div className="w-full md:w-[200px]">
        <div className="flex items-center gap-1 text-xs mb-1">
          <div className="w-4 h-4 rounded-full">
            <img
              src={post.author.image}
              alt=""
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          {post.author.name}
        </div>
        <h3 className="text-md font-bold">{post.titulo}</h3>
        <p className="text-sm">{trim(post.summary ?? "", 75)}</p>
        <span className="text-xs text-gray-400">
          Lectura de {post.read_time} minutos
        </span>
        <div className="flex gap-1 text-xs flex-wrap mt-2">
          {post.postTags.map((tag) => (
            <Tag tag={tag.tags_id.tag}></Tag>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default RecommendedPost;

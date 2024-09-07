import React from "react";
import { trim } from "../../util/images/utils";
import Tag from "../home/Tag";
import { motion } from "framer-motion";

const SearchPostCard = ({ post, delay }) => {
  return (
    <motion.a
      className="flex flex-row gap-4 hover:bg-gray-100  rounded-md cursor-pointer transition-colors w-full md:p-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ delay: delay }}
      href={"/blog/" + post.id}
    >
      <div className="w-[200px] h-[200px] rounded-md">
        <img
          src={post.image}
          alt="placeholder"
          className="bg-cover w-full h-full rounded-md bg-si"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 text-xs mb-1">
          <div className="w-4 h-4 rounded-full">
            <img
              src={post.author.image}
              alt=""
              className="w-full h-full bg-contain rounded-full"
            />
          </div>
          {post.author.name}
        </div>
        <h3 className="text-md font-bold">{post.titulo}</h3>
        <p className="text-sm">{trim(post.summary, 75)}</p>
        <span className="text-xs text-gray-400">
          Lectura de {post.read_time} minutos
        </span>
        <div className="flex gap-1 text-xs flex-wrap mt-2">
          {post.postTags.map((tag) => (
            <Tag tag={tag.tags_id.tag}></Tag>
          ))}
          <Tag tag="ISW"></Tag>
          <Tag tag="IDC"></Tag>
          <Tag tag="Direccion"></Tag>
        </div>
      </div>
    </motion.a>
  );
};

export default SearchPostCard;

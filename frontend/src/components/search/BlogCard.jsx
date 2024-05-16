import { RiAccountCircleFill } from "react-icons/ri";
import TagLabel from "./TagLabel";
import { BsDot } from "react-icons/bs";
import { useCallback } from "react";

const BlogCard = ({ blog }) => {
  const redirectToBlog = useCallback((e) => {
    window.location.href = `/blog/${blog.id}`;
  }, []);
  return (
    <div
      className="py-10 w-full max-w-[1920px] border-b-[1px] border-slate-200 flex items-center justify-between cursor-pointer"
      onClick={redirectToBlog}
    >
      <div className="flex flex-col w-[400px]">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <img
              src={blog.author.image}
              className="h-[20px] w-[20px] rounded-full object-cover"
            />
            <label className="text-sm text-black">{blog.author.name}</label>
            <BsDot className="text-slate-600" />
            <h3 className="text-slate-600 text-sm">
              {new Date(blog.date_created).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>
        </div>
        <h1 className="font-bold text-2xl">{blog.titulo}</h1>
        <h3 className="text-gray-800 text-md">{blog.summary}</h3>{" "}
        <label className="text-sm mt-6 text-gray-500">
          Lectura de {blog.read_time} minutos
        </label>
        <div className="flex items-center gap-2 mt-4">
          {blog.postTags.map((tag) => (
            <TagLabel key={tag.id} tag={tag.tags_id.tag} disabled={false} />
          ))}
        </div>
      </div>

      <div>
        <img src={blog.image} className="h-[150px] w-[200px] object-cover" />
      </div>
    </div>
  );
};

export default BlogCard;

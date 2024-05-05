import { RiAccountCircleFill } from "react-icons/ri";
import TagLabel from "./TagLabel";

const BlogCard = ({ blog }) => {
  const redirectToBlog = (e) => {
    window.location.href = `/blog/${blog.id}`;
  };

  return (
    <div
      className="py-10 w-full max-w-[1000px] border-b-[1px] border-slate-200 flex items-center justify-between cursor-pointer"
      onClick={redirectToBlog}
    >
      <div className="flex flex-col w-[400px]">
        <div className="flex items-center">
          <RiAccountCircleFill className="h-[20px] w-auto text-[#7678FF]" />
          <label className="sm text-slate-600">{blog.autor}</label>
        </div>
        <h1 className="font-bold text-2xl">{blog.titulo}</h1>
        <h3 className="text-slate-600 text-md">{blog.status}</h3>
        <h3 className="text-slate-600 text-xs mt-10">{blog.created}</h3>{" "}
        <div className="flex items-center gap-2 mt-4">
          <button className="">
            <img
              src="https://www.svgrepo.com/show/9764/clap.svg"
              className="w-5 h-5"
            />
          </button>

          <label>{blog.id}</label>
        </div>
      </div>

      <div className="flex gap-2 h-full self-end">
        {blog.postTags.map((tag) => (
          <TagLabel tag={tag} />
        ))}
      </div>

      <div>
        <img src={blog.image} className="h-[150px] w-[200px] object-cover" />
      </div>
    </div>
  );
};

export default BlogCard;

const BlogCard = ({ blog }) => {
  const redirectToBlog = (e) => {
    alert("Redirecting to blog");
    window.location.href = `/blogs/${blog.id}`;
  };

  return (
    <div
      className="py-10 w-full max-w-[1000px] border-b-[1px] border-slate-200 flex items-center justify-between cursor-pointer"
      onClick={redirectToBlog}
    >
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <img
            src="https://media.licdn.com/dms/image/C5603AQFvqiYvr4wzww/profile-displayphoto-shrink_400_400/0/1610397681932?e=2147483647&v=beta&t=zALM6SAb16uXCPqlAOLkEh44g0M-ipe7hzPw1SJjerw"
            className="w-4 h-4 rounded-full"
          />
          <label className="sm text-slate-600">Carlos Aleman</label>
        </div>
        <h1 className="font-bold text-2xl">{blog.autor}</h1>
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

      <div>
        <img src={blog.image} className="h-[150px]" />
      </div>
    </div>
  );
};

export default BlogCard;

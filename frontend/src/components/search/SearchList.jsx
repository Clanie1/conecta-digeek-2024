import { useState, useEffect, useRef } from "react";
import BlogCard from "./BlogCard";
import { getPosts, getTags } from "../../services/functions";
import TagLabel from "./TagLabel";
import { RiAccountCircleFill } from "react-icons/ri";

const SearchList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState(undefined);

  // filters
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const inputRef = useRef(null);
  const blogDateFilter = useRef(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // View More
  const [viewMoreTags, setViewMoreTags] = useState(false);
  const [viewMoreAuthors, setViewMoreAuthors] = useState(false);

  const getBlogs = async () => {
    const posts = await getPosts(selectedTags.map((tag) => tag.id));
    console.log(posts);
    setBlogs(posts);
    setFilteredBlogs(posts);
  };
  const getServerTags = async () => {
    const fetchedTags = await getTags();
    setTags(fetchedTags);
  };

  const searchBlogs = () => {
    const searchValue = inputRef.current.value;
    const filteredblogs = blogs.filter((blog) => {
      return blog.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredBlogs(filteredblogs);
  };

  const filterByDate = () => {
    let filterDate = new Date();
    switch (blogDateFilter.current.value) {
      case "today":
        break;
      case "lastWeek":
        filterDate.setDate(filterDate.getDate() - 7);
        break;
      case "lastMonth":
        filterDate.setMonth(filterDate.getMonth() - 1);
        break;
    }
    const blogsOnDate = blogs.filter((blog) => {
      const blogDate = new Date(blog.date_created);
      return blogDate > filterDate;
    });
    setFilteredBlogs(blogsOnDate);
  };

  useEffect(() => {
    getServerTags();
  }, []);

  useEffect(() => {
    getBlogs();
    filterByDate();
  }, [selectedTags]);

  return (
    <div className=" max-w-[1400px] w-full mx-auto justify-center flex ">
      <div className="w-full max-h-[calc(100vh-60px)] p-10 overflow-scroll scrollbar-hide">
        {/* search bar */}
        <div className="">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchBlogs();
                }
              }}
              type="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-none focus:border-gray-50 focus:outline-slate-300 focus:outline-[1px]"
              placeholder="Search"
            />
          </div>
        </div>
        {/* blogs */}
        <div className="flex w-full mt-4 justify-center">
          <div className="w-full  md:px-10  justify-center items-center flex flex-col ">
            {filteredBlogs == undefined && (
              <div role="status" className="mt-[50px]">
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-200 animate-spin dark:text-black fill-[#7678FF]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {filteredBlogs &&
              filteredBlogs.map((blog, index) => {
                return <BlogCard key={index} blog={blog} />;
              })}
          </div>
        </div>
      </div>

      {/* filters */}
      <div className="w-3/5 max-h-[calc(100vh-60px)] overflow-scroll hidden md:flex flex-col px-4 py-6  border-l-[1px] border-gray-200  gap-6 scrollbar-hide">
        {/* Tags */}
        <div>
          <button className="underline text-sm hover:text-[#7678FFFF]">
            Limpiar Filtros
          </button>
          <h1 className="font-medium">Tags Recomendados</h1>
          <div className="flex flex-wrap gap-2 my-4">
            {tags &&
              !viewMoreTags &&
              tags.slice(0, 5).map((tag, index) => {
                return (
                  <div
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        const updatedSelectedTags = selectedTags.filter(
                          (filterTag) => {
                            return filterTag != tag;
                          }
                        );
                        setSelectedTags(updatedSelectedTags);
                      } else {
                        const updatedSelectedTags = selectedTags.concat(tag);
                        setSelectedTags(updatedSelectedTags);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <TagLabel
                      key={index}
                      tag={tag.tag}
                      disabled={!selectedTags.includes(tag)}
                    />
                  </div>
                );
              })}
            {tags &&
              viewMoreTags &&
              tags.map((tag, index) => {
                return (
                  <div
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        const updatedSelectedTags = selectedTags.filter(
                          (filterTag) => {
                            return filterTag != tag;
                          }
                        );
                        setSelectedTags(updatedSelectedTags);
                      } else {
                        const updatedSelectedTags = selectedTags.concat(tag);
                        setSelectedTags(updatedSelectedTags);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <TagLabel
                      key={index}
                      tag={tag.tag}
                      disabled={!selectedTags.includes(tag)}
                    />
                  </div>
                );
              })}
          </div>
          <button
            className="text-xs text-[#7678FFFF] hover:text-black duration-75"
            href="#"
            onClick={() => {
              setViewMoreTags(!viewMoreTags);
            }}
          >
            {viewMoreTags ? "Ver menos tags" : "Ver mas tags"}
          </button>
        </div>

        {/* Autores */}
        <div>
          <h1 className="font-medium">Autores Recomendados</h1>
          <div className="flex flex-col gap-2 text-sm text-slate-600 my-4">
            <div className="flex items-center">
              <RiAccountCircleFill className="h-[20px] w-auto text-[#7678FF]" />
              <label className="sm text-slate-600">Carlos Aleman</label>
            </div>
            <div className="flex items-center">
              <RiAccountCircleFill className="h-[20px] w-auto text-[#7678FF]" />
              <label className="sm text-slate-600">Carlos Aleman</label>
            </div>
            <div className="flex items-center">
              <RiAccountCircleFill className="h-[20px] w-auto text-[#7678FF]" />
              <label className="sm text-slate-600">Carlos Aleman</label>
            </div>
            <div className="flex items-center">
              <RiAccountCircleFill className="h-[20px] w-auto text-[#7678FF]" />
              <label className="sm text-slate-600">Carlos Aleman</label>
            </div>
          </div>
          <a
            className="text-xs text-[#7678FFFF] hover:text-black duration-75"
            href="#"
          >
            Ver mas Usuarios
          </a>
        </div>

        {/* Dia publicado */}

        <div>
          <h1 className="font-medium">Fecha de Publicacion</h1>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2"
            defaultValue={""}
            onChange={filterByDate}
            ref={blogDateFilter}
          >
            <option disabled hidden value="">
              Selecciona una Fecha
            </option>
            <option value="today">Hoy</option>
            <option value="lastWeek">Esta Semana</option>
            <option value="lastMonth">Ultimo Mes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchList;

import { useState, useEffect, useRef, useCallback } from "react";
import BlogCard from "./BlogCard";
import { getPosts, getTags } from "../../services/functions";
import TagLabel from "./TagLabel";
import { RiAccountCircleFill } from "react-icons/ri";
import LoadingSpinner from "../LoadingSpinner";

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

  const getBlogs = useCallback(
    async (selectedTagIds) => {
      const posts = await getPosts(selectedTagIds);
      setBlogs(posts);
      setFilteredBlogs(posts);
    },
    [selectedTags]
  );

  const getServerTags = useCallback(async () => {
    const fetchedTags = await getTags();
    setTags(fetchedTags);
  }, [getTags, setTags]);

  const searchBlogs = useCallback(() => {
    const searchValue = inputRef.current.value;
    const filteredblogs = blogs.filter((blog) => {
      return blog.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredBlogs(filteredblogs);
  }, [inputRef, blogs]);

  useEffect(() => {
    getServerTags();
    getBlogs(selectedTags.map((tag) => tag.id));
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
            {filteredBlogs == undefined && <LoadingSpinner />}
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
                      if (
                        selectedTags.some(
                          (selectedTag) => selectedTag.tag === tag.tag
                        )
                      ) {
                        const updatedSelectedTags = selectedTags.filter(
                          (filterTag) => {
                            return filterTag.tag != tag.tag;
                          }
                        );
                        setSelectedTags(updatedSelectedTags);
                      } else {
                        const updatedSelectedTags = selectedTags.concat(tag);
                        setSelectedTags(updatedSelectedTags);
                      }
                    }}
                    className="cursor-pointer"
                    key={index}
                  >
                    <TagLabel
                      tag={tag.tag}
                      disabled={
                        !selectedTags.some(
                          (selectedTag) => selectedTag.tag === tag.tag
                        )
                      }
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
      </div>
    </div>
  );
};

export default SearchList;

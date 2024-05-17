import { useState, useEffect, useRef, useCallback } from "react";
import BlogCard from "../search/BlogCard";
import { getFeaturedPosts, getTags } from "../../services/functions";
import TagLabel from "../search/TagLabel";
import { RiAccountCircleFill } from "react-icons/ri";
import LoadingSpinner from "../LoadingSpinner";

const BasicSearch = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Inicializa como un array vacío

  //ref
  const inputRef = useRef(null);

  // filters
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // View More
  const [viewMoreTags, setViewMoreTags] = useState(false);

  const getBlogs = useCallback(
    async (filters) => {
      const posts = await getFeaturedPosts(filters);
      console.log(posts, "sfa");
      setBlogs(posts);
      setFilteredBlogs(posts);
      return posts;
    },
    [] // Las dependencias están vacías porque `filters` se pasan como argumento
  );

  const getServerTags = useCallback(async () => {
    const fetchedTags = await getTags();
    setTags(fetchedTags);
  }, []);

  const filterBlogsBySearchQuery = useCallback(
    (currBlogs) => {
      if (searchQuery === "") return currBlogs;
      const filteredblogs = currBlogs.filter((blog) => {
        return blog.titulo.toLowerCase().includes(searchQuery.toLowerCase());
      });
      return filteredblogs;
    },
    [searchQuery]
  );

  const filterBlogs = useCallback(async () => {
    const filters = {
      tags: selectedTags.map((tag) => tag.id),
    };
    const currBlogs = await getBlogs(filters);
    const filteredBySearchQueryBlogs = filterBlogsBySearchQuery(currBlogs);
    setFilteredBlogs(filteredBySearchQueryBlogs);
  }, [selectedTags, searchQuery, getBlogs, filterBlogsBySearchQuery]);

  useEffect(() => {
    getServerTags();
  }, [getServerTags]);

  useEffect(() => {
    const filteredBySearchQueryBlogs = filterBlogsBySearchQuery(blogs);
    setFilteredBlogs(filteredBySearchQueryBlogs);
  }, [searchQuery, blogs, filterBlogsBySearchQuery]);

  useEffect(() => {
    filterBlogs();
  }, [selectedTags, filterBlogs]);

  return (
    <div className="max-w-[1400px] w-full mx-auto justify-center flex">
      <div className="w-full max-h-[calc(100vh-60px)] pt-0 p-10 overflow-scroll scrollbar-hide">
        {/* blogs */}
        <div className="flex w-full justify-center">
          <div className="w-full md:px-10 justify-center items-center flex flex-col">
            {filteredBlogs.length === 0 && <LoadingSpinner />}
            {filteredBlogs.length > 0 &&
              filteredBlogs.map((blog, index) => {
                return <BlogCard key={index} blog={blog} />;
              })}
          </div>
        </div>
      </div>

      {/* filters */}
      <div className="w-3/5 max-h-[calc(100vh-60px)] overflow-scroll hidden md:flex flex-col px-4 py-6 border-l-[1px] border-gray-200 gap-6 scrollbar-hide">
        {/* Tags */}
        <div>
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
                        console.log(selectedTags);
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
                  >
                    <TagLabel
                      key={index}
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
          </div>
          <div className="flex flex-col gap-2 items-start">
            <button
              className="text-xs text-[#7678FFFF] hover:text-black duration-75"
              href="#"
              onClick={() => {
                setViewMoreTags(!viewMoreTags);
              }}
            >
              {viewMoreTags ? "Ver menos tags" : "Ver mas tags"}
            </button>
            <button
              className="text-xs text-black underline hover:text-black duration-75"
              onClick={() => {
                setSelectedTags([]);
              }}
            >
              Limpiar Tags
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicSearch;

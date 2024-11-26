import { useState, useEffect, useRef, useCallback } from "react";
import BlogCard from "./BlogCard";
import { getPosts, getTags, getAuthors } from "../../services/functions";
import TagLabel from "./TagLabel";
import { RiAccountCircleFill } from "react-icons/ri";
import LoadingSpinner from "../LoadingSpinner";
import AuthorLabel from "./AuthorLabel";
import SearchPostCard from "./SearchPostCard";
import Author from "../home/Author";
import SearchAuthor from "./SearchAuthor";
import HeroSection from "../home/HeroSection";
import SearchHero from "./SearchHero";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { debounce } from "../../util/images/utils";

const SearchList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState(undefined);

  //ref
  const inputRef = useRef(null);

  //loading
  const [tagsLoading, setTagsLoading] = useState(true);
  const [authorsLoading, setAuthorsLoading] = useState(true);
  const [searchQuerySet, setSearchQuerySet] = useState(false);

  // filters
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // View More
  const [viewMoreTags, setViewMoreTags] = useState(false);
  const [viewMoreAuthors, setViewMoreAuthors] = useState(false);

  const getBlogs = useCallback(
    async (selectedTagIds) => {
      const posts = await getPosts(selectedTagIds);
      setBlogs(posts);
      setFilteredBlogs(posts);
      return posts;
    },
    [selectedTags]
  );

  const getServerTags = useCallback(async () => {
    const fetchedTags = await getTags();
    setTags(fetchedTags);
    setTagsLoading(false);
  }, []);

  const getServerAuthors = useCallback(async () => {
    const fetchedAuthors = await getAuthors();
    setAuthors(fetchedAuthors);
    setAuthorsLoading(false);
  }, []);

  const filterBlogs = useCallback(async (tags, authors, query) => {
    const filters = {
      tags: tags.map((tag) => tag.id),
      author: authors.map((author) => author.id),
      query: query,
    };
    const currBlogs = await getBlogs(filters);
    setFilteredBlogs(currBlogs);
  }, []);

  useEffect(() => {
    if (!searchQuerySet) return;
    debouncedFilterBlogs(selectedTags, selectedAuthors, searchQuery);
  }, [selectedTags, selectedAuthors, searchQuerySet, searchQuery]);

  const debouncedFilterBlogs = useCallback(debounce(filterBlogs, 500), []);

  useEffect(() => {
    getServerAuthors();
    getServerTags();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("query")) {
      const query = url.searchParams.get("query");
      setSearchQuery(decodeURIComponent(query));
    }
    if (url.searchParams.has("author")) {
      const author = url.searchParams.get("author");
      setSelectedAuthors([{ id: author, name: author }]);
    }
    setSearchQuerySet(true);
  }, []);

  const getRecommendedTags = useCallback(() => {
    // Find tags based on the filtered blogs
    if (filteredBlogs == undefined) return [];

    const tagCount = new Map();
    for (const blog of filteredBlogs) {
      for (const tag of blog.postTags) {
        tagCount.set(tag.tags_id, (tagCount.get(tag.tags_id) || 0) + 1);
      }
    }

    const sortedTags = Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]);
    const recommendedTags = sortedTags.slice(0, 5).map((tag) => tag[0]);
    return recommendedTags;
  }, [filteredBlogs]);

  const getRecommendedAuthors = useCallback(() => {
    if (filteredBlogs == undefined) return [];

    const authorCount = new Map();
    for (const blog of filteredBlogs) {
      authorCount.set(blog.author, (authorCount.get(blog.author) || 0) + 1);
    }

    const sortedAuthors = Array.from(authorCount.entries()).sort(
      (a, b) => b[1] - a[1]
    );
    const recommendedAuthors = sortedAuthors.slice(0, 3).map((author) => author[0]);
    return recommendedAuthors;
  }, [filteredBlogs]);

  return (
    <div className="w-full mb-10">
      <SearchHero />
      <div className="container mx-auto w-full justify-center flex mt-[50px] md:flex-row flex-col">
        <div className="flex-1 p-2 md:pr-4">
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900/50" />
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery}
              type="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-none focus:border-gray-50 focus:outline-slate-300 focus:outline-[1px]"
              placeholder="Buscar"
            />
          </div>
          <div className="w-full md:pr-4 mt-4">
            {/* blogs */}
            <div className="flex w-full mt-4 justify-center">
              <div className="w-full  justify-center items-center flex flex-col gap-4 md:gap-0">
                {filteredBlogs == undefined && (
                  <div className="w-full h-96 animate-pulse bg-gray-200 rounded-md"></div>
                )}
                {filteredBlogs &&
                  filteredBlogs.map((blog, index) => {
                    return (
                      <SearchPostCard
                        key={blog.id + index}
                        post={blog}
                        delay={index * 0.05}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* filters */}
        <div className="w-[400px] flex flex-col px-4 py-6  border-l-[1px] border-gray-200  gap-6">
          {/* Tags */}
          <div>
            <h1 className="font-medium">Tags Recomendados</h1>
            <div className="flex flex-wrap gap-2 my-4">
              {tagsLoading && (
                <div className="w-full h-10 animate-pulse bg-gray-200 rounded-md"></div>
              )}
              {tags &&
                !viewMoreTags &&
                getRecommendedTags().map((tag, index) => {
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
                        delay={index * 0.05}
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

          {/* Autores */}
          <div>
            <h1 className="font-medium">Autores Recomendados</h1>
            <div className="flex flex-col text-sm text-slate-600 my-4">
              {authorsLoading && (
                <div className="w-full h-[200px] animate-pulse bg-gray-200 rounded-md"></div>
              )}
              {authors &&
                !viewMoreAuthors &&
                getRecommendedAuthors().map((author, index) => {
                  return (
                    <button
                      className="w-full"
                      key={author.id}
                      onClick={() => {
                        if (
                          selectedAuthors.some(
                            (selectedAuthor) => selectedAuthor.id === author.id
                          )
                        ) {
                          const updatedSelectedAuthors = selectedAuthors.filter(
                            (filterAuthor) => {
                              return filterAuthor.id != author.id;
                            }
                          );
                          setSelectedAuthors(updatedSelectedAuthors);
                        } else {
                          const updatedSelectedAuthors =
                            selectedAuthors.concat(author);
                          setSelectedAuthors(updatedSelectedAuthors);
                        }
                      }}
                    >
                      <SearchAuthor
                        author={author}
                        delay={index * 0.05}
                        selected={selectedAuthors.some(
                          (selectedAuthor) => selectedAuthor.id == author.id
                        )}
                      />
                    </button>
                  );
                })}
              {authors &&
                viewMoreAuthors &&
                authors.map((author, index) => {
                  return (
                    <button
                      className="w-full"
                      key={author.id}
                      onClick={() => {
                        if (
                          selectedAuthors.some(
                            (selectedAuthor) => selectedAuthor.id === author.id
                          )
                        ) {
                          const updatedSelectedAuthors = selectedAuthors.filter(
                            (filterAuthor) => {
                              return filterAuthor.id != author.id;
                            }
                          );
                          setSelectedAuthors(updatedSelectedAuthors);
                        } else {
                          const updatedSelectedAuthors =
                            selectedAuthors.concat(author);
                          setSelectedAuthors(updatedSelectedAuthors);
                        }
                      }}
                    >
                      <SearchAuthor
                        author={author}
                        delay={index * 0.05}
                        selected={selectedAuthors.some(
                          (selectedAuthor) => selectedAuthor.id == author.id
                        )}
                      />
                    </button>
                  );
                })}
            </div>
            <button
              className="text-xs text-[#7678FFFF] hover:text-black duration-75"
              onClick={() => {
                setViewMoreAuthors(!viewMoreAuthors);
              }}
            >
              {viewMoreAuthors ? "Ver menos Autores" : "Ver mas Autores"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;

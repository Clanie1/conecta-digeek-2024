import React from "react";
import { IoSearch } from "react-icons/io5";

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search?query=${searchQuery}`;
  };
  return (
    <form className="relative mt-10" onSubmit={submitSearch}>
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
    </form>
  );
};

export default HomeSearch;

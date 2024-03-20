import { useState, useEffect, useRef } from "react";
import VlogCard from "./VlogCard";

const SearchList = () => {
  const [vlogs, setVlogs] = useState([]);
  const [filteredVlogs, setfilteredVlogs] = useState([]);
  const inputRef = useRef(null);

  const getVlogs = async () => {
    try {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setfilteredVlogs(data.results);
      setVlogs(data.results);
    } catch {
      console.log("Error in fetching data");
    }
  };

  console.log(vlogs);

  const searchVlog = () => {
    const searchValue = inputRef.current.value;
    const filteredVlogs = vlogs.filter((vlog) => {
      return vlog.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setfilteredVlogs(filteredVlogs);
  };

  useEffect(() => {
    getVlogs();
  }, []);

  return (
    <div className="w-5/6 mx-auto">
      <div className="mt-10">
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
                searchVlog();
              }
            }}
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-none focus:border-gray-50 focus:outline-slate-300 focus:outline-[1px]"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex w-full mt-4">
        <div className="w-full md:w-2/3 md:px-10">
          {filteredVlogs.map((vlog, index) => {
            return <VlogCard key={index} vlog={vlog} />;
          })}
        </div>
        <div className="w-1/3 border-l-[1px] border-slate-300 p-2 hidden md:flex">
          filtros
        </div>
      </div>
    </div>
  );
};

export default SearchList;

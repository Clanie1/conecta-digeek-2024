import React from "react";

function AuthorLabel({ author, selected = false }) {
  return (
    <div
      className={
        "flex items-center gap-2 border-b-2 px-2 py-4 hover:border-gray-500 duration-75 w-full" +
        (selected ? " border-purple-500" : "")
      }
      key={author.id}
    >
      <img
        src={author.image}
        className="h-[40px] w-[40px] rounded-full object-cover"
      />
      <h3 className="text-md font-bold text-slate-600">{author.name}</h3>
    </div>
  );
}

export default AuthorLabel;

import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";
import Input from "./Input";

const Feed = () => {
  return (
    <div className=" flex flex-col flex-grow border border-gray-200 relative">
      <div
        className="flex w-full
      h-12 border-b border-gray-200 justify-between items-center px-2 sticky top-0 z-30 bg-white"
      >
        <h2 className="capitalize font-bold cursor-pointer text-lg sm:font-xl">
          home
        </h2>
        <div>
          <SparklesIcon className="hoverEffect h-10 w-10 p-2 text-gray-700" />
        </div>
      </div>
      <Input />
    </div>
  );
};

export default Feed;

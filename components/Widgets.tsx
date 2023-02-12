import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Widgets = () => {
  return (
    <div className="hidden lg:inline xl:w-[600px] lg:w-[400px]">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 space-y-5 mx-auto">
        <div className="flex items-center h-10 p-3 rounded-full relative ">
          <MagnifyingGlassIcon className="h-5 w-5 z-10 text-gray-500" />
          <input
            className="absolute inset-0 h-10 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 placeholder:capitalize"
            type="search"
            placeholder="search twitter"
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;

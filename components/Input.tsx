import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";

const Input = () => {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src={""}
        alt="profile img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div>
          <textarea
            className="w-full focus:ring-0 border-none text-lg placeholder-gray-700 placeholder:capitalize tracking-wide min-h-[50px] text-gray-700"
            name=""
            id=""
            placeholder="what's happening?"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <PhotoIcon className="h-11 w-11 hoverEffect p-2 text-sky-500 hover:text-sky-400" />
            <FaceSmileIcon className="h-11 w-11 hoverEffect p-2 text-sky-500 hover:text-sky-400" />
          </div>
          <button className="capitalize bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;

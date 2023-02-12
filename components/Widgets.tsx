import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import News from "./News";

interface SourceI {
  id: null | string;
  name: string;
}
export interface ArticleI {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: SourceI;
  title: string;
  url: string;
  urlToImage: string;
}

interface WidgetsProps {
  articles: ArticleI[];
}

const Widgets = ({ articles }: WidgetsProps) => {
  return (
    <div className="hidden lg:inline xl:w-[600px] lg:w-[400px] ">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 space-y-5 px-4">
        <div className="flex items-center h-10 p-3 rounded-full relative ">
          <MagnifyingGlassIcon className="h-5 w-5 z-10 text-gray-500" />
          <input
            className="absolute inset-0 h-10 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 placeholder:capitalize"
            type="search"
            placeholder="search twitter"
          />
        </div>
      </div>
      <div className="px-4 space-y-3 w-[90%] xl:w-[75%] bg-red-50">
        <h4 className="capitalize text-gray-600 tracking-wide font-bold">
          {"what's happening . . ."}
        </h4>
        <div className="flex flex-col gap-2">
          {articles.map((article, index) => (
            <News key={index} article={article} />
          ))}
        </div>
        <button className="capitalize text-sm text-blue-500 cursor-pointer hover:text-blue-300">
          show more...
        </button>
      </div>
    </div>
  );
};

export default Widgets;

import { ArticleI, UserI } from "@/types/INTERFACES";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import News from "./News";
import Peoples from "./Peoples";

interface WidgetsProps {
  articles: ArticleI[];
  users: UserI[];
}

const Widgets = ({ articles, users }: WidgetsProps) => {
  const [newsLimit, setNewsLimit] = useState<number>(3);
  const [peoplesLimit, setPeoplesLimit] = useState<number>(3);
  return (
    <div className="hidden lg:inline xl:w-[600px] lg:w-[400px] space-y-3">
      <div className="w-[100%] px-4 sticky top-0 bg-white py-1.5 space-y-5">
        <div className="flex items-center h-10 w-[100%] xl:w-[83%] p-3 rounded-full relative ">
          <MagnifyingGlassIcon className="h-5 w-5 z-10 text-gray-500" />
          <input
            className="absolute inset-0 h-10 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 placeholder:capitalize"
            type="search"
            placeholder="search twitter"
          />
        </div>
      </div>
      <div className="mx-4 p-3 rounded-xl space-y-3 w-[90%] xl:w-[75%] bg-red-50">
        <h4 className="capitalize text-gray-600 tracking-wide font-bold">
          {"what's happening . . ."}
        </h4>
        <div className="flex flex-col gap-3 p-2">
          {articles.slice(0, newsLimit).map((article, index) => (
            <News key={index} article={article} />
          ))}
        </div>
        <button
          onClick={() =>
            setNewsLimit((prev) => {
              return prev + 3;
            })
          }
          className="capitalize text-sm text-blue-500 cursor-pointer hover:text-blue-300"
        >
          show more...
        </button>
      </div>
      (
      <>
        <div className="mx-4 p-3 rounded-xl space-y-3 w-[90%] xl:w-[75%] bg-red-50">
          <h4 className="capitalize text-gray-600 tracking-wide font-bold">
            Peoples you may know
          </h4>
          <div className="flex flex-col gap-4 ">
            {users.slice(0, peoplesLimit).map((user, index) => (
              <Peoples key={index} user={user} />
            ))}
          </div>
          <button
            onClick={() =>
              setPeoplesLimit((prev) => {
                return prev + 3;
              })
            }
            className="capitalize text-sm text-blue-500 cursor-pointer hover:text-blue-300"
          >
            show more...
          </button>
        </div>
      </>
      )
    </div>
  );
};

export default Widgets;

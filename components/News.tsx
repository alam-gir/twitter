import React from "react";
import { ArticleI } from "./Widgets";
interface NewsProps {
  article: ArticleI;
}

const News = ({ article }: NewsProps) => {
  return (
    <a
      className="hover:bg-red-100 h-[4rem] rounded-lg pr-2 flex items-center p-1"
      href={article.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex  gap-2 items-center">
        <img
          src={article.urlToImage}
          alt=""
          className="h-[3.5rem] w-[4rem] object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <p className="text-sm leading-4">
            {article.title.slice(0, 30) + "..."}
          </p>
          <p className="text-[12px] text-gray-400">{article.source.name}</p>
        </div>
      </div>
    </a>
  );
};

export default News;

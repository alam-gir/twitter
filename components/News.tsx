import React from "react";
import { ArticleI } from "./Widgets";
interface NewsProps {
  article: ArticleI;
}

const News = ({ article }: NewsProps) => {
  console.log("article from newsss", article);
  return (
    <a
      className="hover:bg-red-100"
      href={article.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex h-[3rem] gap-2">
        <img
          src={article.urlToImage}
          alt=""
          className="h-full w-[4rem] object-cover"
        />
        <p className="text-sm">{article.title.slice(0, 30) + "..."}</p>
      </div>
    </a>
  );
};

export default News;

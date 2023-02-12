import {
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React from "react";
interface PostProps {
  id: string;
  name: string;
  username: string;
  userImg: string;
  img: string;
  text: string;
  timestamp: string;
}
const Post = ({
  id,
  name,
  username,
  userImg,
  img,
  text,
  timestamp,
}: PostProps) => {
  return (
    <div className="w-full p-4 flex gap-2 border-b border-gray-200">
      {/* userImg */}
      <div className="w-[3rem] h-[3rem] rounded-full flex items-center justify-center">
        <img src={userImg} className="h-[2.5rem] w-[2.5rem] rounded-full" />
      </div>

      {/* rightside */}
      <div className="flex flex-col w-full space-y-1.5">
        {/* Header  */}

        <div className="flex w-full space-x-1 items-center justify-between whitespace-nowrap h-[3rem]">
          {/*post user info  */}
          <div className="flex space-x-1 items-center ">
            <h4 className="font-bold capitalize text-[15px] sm:text-[16px] hover:underline cursor-pointer">
              {name}
            </h4>
            <span className=" text-sm sm:text-[15px] hover:underline cursor-pointer">
              @{username}
            </span>
            <span className=" text-sm sm:text-[15px] ">- {timestamp}</span>
          </div>
          {/* dot icon  */}
          <EllipsisHorizontalIcon className="h-6 w-auto hover:text-sky-500 cursor-pointer" />
        </div>

        {/* post text  */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] capitalize pb-2">
          {text}
        </p>

        {/* post image  */}
        <img src={img} alt="" className="h-auto w-full rounded-2xl pr-1" />

        {/* post reaction icons  */}
        <div className="flex justify-between px-4 py-2">
          <ChatBubbleBottomCenterTextIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 p-2 hoverEffect hover:text-red-500 hover:bg-red-100" />
          <HeartIcon className="h-9 w-9 p-2 hoverEffect hover:text-red-500 hover:bg-red-100" />
          <ShareIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;

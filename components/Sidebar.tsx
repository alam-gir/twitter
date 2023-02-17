import Image from "next/image";
import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  ArrowLeftCircleIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

const Sidebar = () => {
  const { data } = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start sticky top-0 h-screen w-auto ">
      {/* {twitter logo} */}
      <div className="hoverEffect p-0">
        <Image
          width={50}
          height={50}
          src={
            "https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          }
          alt=""
        ></Image>
      </div>

      {/* {menu item} */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem Icon={HomeIcon} text={"home"} active={true} />
        <SidebarMenuItem Icon={HashtagIcon} text={"explore"} active={false} />

        <SidebarMenuItem
          Icon={BellIcon}
          text={"notifications"}
          active={false}
        />
        <SidebarMenuItem Icon={InboxIcon} text={"messages"} active={false} />
        <SidebarMenuItem
          Icon={BookmarkIcon}
          text={"bookmarks"}
          active={false}
        />
        <SidebarMenuItem
          Icon={ClipboardDocumentListIcon}
          text={"Lists"}
          active={false}
        />
        <SidebarMenuItem
          Icon={UserCircleIcon}
          text={"profile"}
          active={false}
        />
        <SidebarMenuItem
          Icon={EllipsisHorizontalCircleIcon}
          text={"more"}
          active={false}
        />
        <SidebarMenuItem
          Icon={ArrowLeftCircleIcon}
          text={"log out"}
          active={false}
          clickHandler={signOut}
        />
      </div>

      {/* {twitt button} */}
      <div>
        <button className="bg-blue-400 text-white  rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg capitalize hidden xl:inline">
          tweet
        </button>
      </div>

      {/* {mini profile} */}
      <div className="hoverEffect flex items-center justify-center text-gray-700 xl:justify-start mt-auto">
        <img
          src={data?.user?.image}
          alt="profileImg"
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className=" text-sm font-bold capitalize whitespace-nowrap">
            {data?.user.name}
          </h4>
          <p className="text-gray-500 text-[13px]">@{data?.user.username}</p>
        </div>
        <EllipsisHorizontalIcon className="h-10 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;

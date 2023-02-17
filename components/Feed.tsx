import {
  ArrowRightCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";
import SidebarMenuItem from "./SidebarMenuItem";

const Feed = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshop) => setPosts(snapshop.docs)
    );
  }, [db]);

  return (
    <div className="flex flex-col border border-gray-200 relative w-full">
      <div
        className="flex w-full
      h-12 border-b border-gray-200 justify-between items-center px-2 sticky top-0 z-30 bg-[rgba(255,255,255,.7)]  backdrop-blur-xl "
      >
        <h2 className="capitalize font-bold cursor-pointer text-lg sm:font-xl">
          home
        </h2>
        <div>
          <SparklesIcon className=" hidden sm:inline hoverEffect h-10 w-10 p-2 text-gray-700" />
          <div className="sm:hidden">
            <SidebarMenuItem
              Icon={ArrowRightCircleIcon}
              text={"log out"}
              active={false}
            />
          </div>
        </div>
      </div>
      {/* {INPUT } */}
      <div>
        <Input />
      </div>

      {/* {post } */}
      <div>
        <div>
          {posts.map((post, index) => (
            <Post
              key={index}
              uid={post?.data()?.uid}
              name={post?.data()?.name}
              username={post?.data()?.username}
              userImg={post?.data().userImage}
              text={post?.data().text}
              image={post?.data()?.image}
              timestamp={post?.data()?.timestamp}
              docId={post?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;

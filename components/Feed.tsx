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
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";
import SidebarMenuItem from "./SidebarMenuItem";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { postedState } from "@/atom/Posted";
import { signOut } from "next-auth/react";

const Feed = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const posted = useRecoilValue(postedState);

  const postFetched = async () => {
    await getDocs(
      query(collection(db, "posts"), orderBy("timestamp", "desc"))
    ).then((snapshot) => {
      setPosts(snapshot.docs);
    });
  };
  // fetch all posts
  useEffect(() => {
    // onSnapshot(
    //   query(collection(db, "posts"), orderBy("timestamp", "desc")),
    //   (snapshop) => setPosts(snapshop.docs)
    // );
    postFetched();

    console.log("redrednderd the feed for posted");
  }, [db, posted]);

  console.log("posted value", posted);
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
              clickHandler={signOut}
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
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Post key={index} post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Feed;

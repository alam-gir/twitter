import { ArrowLeftCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";
import { signIn, useSession } from "next-auth/react";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

interface PostI {
  image?: string;
  name: string;
  text?: string;
  timestamp: string;
  uid: string;
  userImage?: string;
  username: string;
}

const Feed = () => {
  const { data } = useSession();
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp")),
      (snapshop) => setPosts(snapshop.docs)
    );
  }, []);

  posts.forEach((post) => console.log(post.data().image));
  console.log(posts);
  // const posts = [
  //   {
  //     id: "1",
  //     name: "Shahand Ghavidel",
  //     username: "username",
  //     userImg:
  //       "https://images.unsplash.com/photo-1520974735194-9e0ce82759fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  //     img: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  //     text: "niceview",
  //     timestamp: "2 hours age",
  //   },
  //   {
  //     id: "2",
  //     name: "Kazal Mia",
  //     username: "username",
  //     userImg:
  //       "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //     img: "https://plus.unsplash.com/premium_photo-1664361480362-4ad85f0b0c4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  //     text: "niceview",
  //     timestamp: "1 hours age",
  //   },
  //   {
  //     id: "3",
  //     name: "Rabin Ghavidel",
  //     username: "username",
  //     userImg:
  //       "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  //     img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  //     text: "niceview",
  //     timestamp: "2 days age",
  //   },
  // ];
  return (
    <div className="flex flex-col border border-gray-200 relative w-full">
      <div
        className="flex w-full
      h-12 border-b border-gray-200 justify-between items-center px-2 sticky top-0 z-30 bg-white"
      >
        <h2 className="capitalize font-bold cursor-pointer text-lg sm:font-xl">
          home
        </h2>
        <div>
          {data ? (
            <SparklesIcon className="hoverEffect h-10 w-10 p-2 text-gray-700" />
          ) : (
            <SidebarMenuItem
              Icon={ArrowLeftCircleIcon}
              text={"Sign In"}
              clickHandler={signIn}
              active={false}
            />
          )}
        </div>
      </div>
      {/* {INPUT } */}
      <div>{data?.user && <Input />}</div>

      {/* {post } */}
      <div>
        <div>
          {posts.map((post, index) => (
            // <Post
            //   key={post.data().uid}
            //   uid={post.data().uid}
            //   name={post.data().name}
            //   username={post.data().username}
            //   userImg={post.data().userImg}
            //   image={post.data().image}
            //   text={post.data().text}
            //   timestamp={post.data().timestamp}
            // />
            <Post
              key={index}
              uid={post?.data()?.uid}
              name={post?.data()?.name}
              username={post?.data()?.username}
              userImg={post?.data().userImage}
              text={post?.data().text}
              image={post?.data()?.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;

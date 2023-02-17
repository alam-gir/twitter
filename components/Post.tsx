import { db, storage } from "@/firebase";
import {
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
interface PostProps {
  uid: string;
  name: string;
  username: string;
  userImg: string;
  image?: string;
  text?: string;
  docId: string;
  timestamp?: any;
}
const Post = ({
  uid,
  name,
  username,
  userImg,
  image,
  text,
  docId,
  timestamp,
}: PostProps) => {
  const [reacts, setReacts] = useState<DocumentData[] | undefined>([]);
  const [isReacted, setReacted] = useState<boolean>(false);
  const { data } = useSession();
  const userId = data?.user?.uid as string;
  // get Reaction collection from server
  useEffect(() => {
    onSnapshot(collection(db, "posts", docId, "reacts"), (snapshot) =>
      setReacts(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setReacted(reacts?.findIndex((react) => react.id === userId) !== -1);
  }, [reacts]);
  // likes store and remove
  const hadnlerReact = async () => {
    const userId = data?.user.uid as string;
    const docRef = doc(db, "posts", docId, "reacts", userId);
    isReacted
      ? await deleteDoc(docRef)
      : await setDoc(docRef, {
          username: userId,
        });
  };

  // delete a post
  const handlerDelete = async () => {
    if (window.confirm("Are you sure to delete this post ?")) {
      //delete post
      const docRef = doc(db, "posts", docId);
      await deleteDoc(docRef);
      // delete image
      const imgRef = ref(storage, `posts/${docId}/image`);
      await deleteObject(imgRef);
    }
  };

  return (
    <div className="w-full p-4 flex gap-2 border-b border-gray-200">
      {/* userImg */}
      <div className="w-[3rem] h-[3rem] rounded-full flex items-center justify-center">
        <img
          src={userImg}
          className="h-[2.5rem] w-[2.5rem] rounded-full"
          alt=""
        />
      </div>

      {/* rightside */}
      <div className="flex flex-col w-full space-y-1.5">
        {/* Header  */}

        <div className="flex w-full space-x-1 items-center justify-between whitespace-nowrap h-[3rem]">
          {/*post user info  */}
          <div className="flex space-x-2 items-center h-full">
            <div className="flex flex-col leading-5">
              <h4 className="font-bold capitalize text-[15px] sm:text-[16px] hover:underline cursor-pointer">
                {name}
              </h4>
              <span className=" text-[13px] sm:text-[15px] hover:underline cursor-pointer text-gray-500">
                @{username}
              </span>
            </div>
            <span className="h-full">
              <Moment fromNow className="text-[12px] text-gray-400">
                {timestamp?.toDate()}
              </Moment>
            </span>
          </div>
          {/* dot icon  */}
          <EllipsisHorizontalIcon className="h-6 w-auto hover:text-sky-500 cursor-pointer" />
        </div>

        {/* post text  */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] capitalize pb-2">
          {text}
        </p>

        {/* post image  */}
        <img src={image} alt="" className="h-auto w-full rounded-2xl pr-1" />

        {/* post reaction icons  */}
        <div className="flex justify-between px-4 py-2">
          <ChatBubbleBottomCenterTextIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          {uid === data?.user.uid && (
            <TrashIcon
              className="h-9 w-9 p-2 hoverEffect hover:text-red-500 hover:bg-red-100"
              onClick={handlerDelete}
            />
          )}
          <div className="flex items-center">
            {isReacted ? (
              <div>
                <HeartIconSolid
                  onClick={hadnlerReact}
                  className=" text-[#e50914] h-9 w-9 p-2  hoverEffect hover:text-red-500 hover:bg-red-100"
                />
              </div>
            ) : (
              <HeartIcon
                onClick={hadnlerReact}
                className="h-9 w-9 p-2 hoverEffect hover:text-red-500 hover:bg-red-100"
              />
            )}
            <span
              className={`${isReacted ? "text-[#e50914]" : "text-gray-600"}
                   text-sm`}
            >
              {reacts?.length}
            </span>
          </div>

          <ShareIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;

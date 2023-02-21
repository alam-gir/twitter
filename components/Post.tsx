import { commentModalState, docIdState } from "@/atom/CommentModalState";
import { db, storage } from "@/firebase";
import {
  ChartBarIcon,
  ChatBubbleBottomCenterIcon,
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
import { useRecoilState } from "recoil";
interface PostI {
  post?: DocumentData;
  handlerReact: (postId: string, isReacted: boolean) => Promise<void>;
}

const Post = ({ post, handlerReact }: PostI) => {
  const [reacts, setReacts] = useState<DocumentData[] | undefined>([]);
  const [comments, setComments] = useState<DocumentData[] | undefined>([]);
  const [isReacted, setReacted] = useState<boolean>(false);
  const { data } = useSession();
  const [isOpenCommentM, setOpenCommentM] =
    useRecoilState<boolean>(commentModalState);
  const [docId, setDocId] = useRecoilState<string>(docIdState);

  const userId = data?.user?.uid as string;

  // get Reaction collection from server
  useEffect(() => {
    const docsRef = collection(db, "posts", post?.id, "reacts");
    onSnapshot(docsRef, (snapshot) => setReacts(snapshot.docs));
  }, [db]);

  // get comments collection from server
  useEffect(() => {
    const docsRef = collection(db, "posts", post?.id, "comments");
    onSnapshot(docsRef, (snapshot) => setComments(snapshot.docs));
  }, [db]);

  useEffect(() => {
    setReacted(reacts?.findIndex((react) => react.id === userId) !== -1);
  }, [reacts]);

  // delete a post
  const handlerDelete = async () => {
    if (window.confirm("Are you sure to delete this post ?")) {
      //delete post
      const docRef = doc(db, "posts", post?.id);
      await deleteDoc(docRef);
      // delete image if available
      if (post?.data().image) {
        const imgRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imgRef);
      }
    }
  };

  return (
    <div className="w-full p-4 flex gap-2 border-b border-gray-200">
      {/* userImg */}
      <div className="w-[3rem] h-[3rem] rounded-full flex items-center justify-center">
        <img
          src={post?.data().userImage}
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
                {post?.data().name}
              </h4>
              <span className=" text-[13px] sm:text-[15px] hover:underline cursor-pointer text-gray-500">
                @{post?.data().username}
              </span>
            </div>
            <span className="h-full">
              <Moment fromNow className="text-[12px] text-gray-400">
                {post?.data().timestamp?.toDate()}
              </Moment>
            </span>
          </div>
          {/* dot icon  */}
          <EllipsisHorizontalIcon className="h-6 w-auto hover:text-sky-500 cursor-pointer" />
        </div>

        {/* post text  */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] capitalize pb-2">
          {post?.data().text}
        </p>

        {/* post image  */}
        <img
          src={post?.data().image}
          alt=""
          className="h-auto w-full rounded-2xl pr-1"
        />

        {/* post reaction icons  */}
        <div className="flex justify-between px-4 py-2">
          {/* //comment icon */}
          {
            <div className="flex items-center">
              {comments?.length ? (
                <ChatBubbleBottomCenterTextIcon
                  className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100"
                  onClick={() => {
                    setDocId(post?.id);
                    setOpenCommentM(true);
                  }}
                />
              ) : (
                <ChatBubbleBottomCenterIcon
                  className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100"
                  onClick={() => {
                    setDocId(post?.id);
                    setOpenCommentM(true);
                  }}
                />
              )}
              {comments?.length! > 0 && comments?.length}
            </div>
          }

          {/* // trash icon  */}
          {post?.data().uid === data?.user.uid && (
            <TrashIcon
              className="h-9 w-9 p-2 hoverEffect hover:text-red-500 hover:bg-red-100"
              onClick={handlerDelete}
            />
          )}
          <div className="flex items-center">
            {isReacted ? (
              <div>
                <HeartIconSolid
                  onClick={() => handlerReact(post?.id, isReacted)}
                  className=" text-[#e50914] h-9 w-9 p-2  hoverEffect hover:text-red-500 hover:bg-red-100"
                />
              </div>
            ) : (
              <HeartIcon
                onClick={() => handlerReact(post?.id, isReacted)}
                className="h-9 w-9 p-2 hoverEffect hover:text-red-500 hover:bg-red-100"
              />
            )}

            {reacts?.length! > 0 && (
              <span
                className={`${isReacted ? "text-[#e50914]" : "text-gray-600"}
                   text-sm`}
              >
                {reacts?.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;

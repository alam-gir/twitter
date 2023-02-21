import { db } from "@/firebase";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import Moment from "react-moment";

const Comments = ({
  retweet,
  docId,
  commentId,
}: {
  retweet?: DocumentData;
  docId: string;
  commentId: string;
}) => {
  const { data } = useSession();

  //delete handler
  const handlerDelete = async () => {
    const confirmation = window.confirm(
      "Are You Sure To Delete This Retweet Reply ?"
    );

    if (confirmation) {
      const docRef = doc(
        db,
        "posts",
        docId,
        "comments",
        commentId,
        "reply",
        retweet?.id
      );
      await deleteDoc(docRef);
    }
  };

  return (
    <div>
      {/* headers */}
      <div className="flex leading-4 gap-2 items-center">
        <div className="h-8 w-8 rounded-full bg-red-300">
          <img
            src={retweet?.data()?.userImage}
            alt=""
            className="cursor-pointer h-full w-full rounded-full"
          />
        </div>
        <div>
          <h4 className="text-[14px] sm:text-[15px] text-gray-700 cursor-pointer hover:underline">
            {retweet?.data()?.name}
          </h4>
          <p className="text-[12px] text-gray-400">
            <Moment fromNow>{retweet?.data()?.timestamp?.toDate()}</Moment>
          </p>
        </div>
      </div>

      {/* retweets body  */}
      <div className="pl-10">
        {/* retweets context  */}
        <div className="pt-1 pb-1">
          <p className="text-[13px] sm:text-[14px] text-gray-600">
            {retweet?.data()?.text}
          </p>
          {retweet?.data()?.image && (
            <div className=" bg-green-300 h-36 w-1/2">
              <img
                src={retweet?.data()?.image}
                alt=""
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        {/* interatins btns  */}
        <div className="flex gap-3">
          <div>
            <ChatBubbleBottomCenterIcon className="h-6 w-6 p-1 cursor-pointer hover:text-red-500" />
          </div>
          <div>
            <HeartIcon className="h-6 w-6 p-1 cursor-pointer hover:text-red-500" />
          </div>
          <div>
            <ShareIcon className="h-6 w-6 p-1 cursor-pointer hover:text-blue-500" />
          </div>

          <div>
            {retweet?.data()?.uid === data?.user.uid && (
              <TrashIcon
                className="h-6 w-6 p-1 cursor-pointer hover:text-red-500"
                onClick={handlerDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

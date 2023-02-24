import { db, storage } from "@/firebase";
import {
  ChatBubbleBottomCenterIcon,
  FaceSmileIcon,
  HeartIcon,
  PhotoIcon,
  ShareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import LoaderSVG from "./LoaderSVG";
import SubComments from "./SubComments";

const Comments = ({
  comment,
  docId,
}: {
  comment: DocumentData;
  docId: string;
}) => {
  const { data } = useSession();
  const [isShowReply, setShowReply] = useState<boolean>(false);
  const [retweetInput, setRetweetInput] = useState<string>("");
  const [retweetReplys, setRetweetsReplys] = useState<DocumentData[]>([]);
  const imagePicker = useRef<HTMLInputElement | null>(null);
  const [retweetReplyImage, setRetweetReplyImage] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  // get all retweets reply
  useEffect(() => {
    const docRef = collection(
      db,
      "posts",
      docId,
      "comments",
      comment.id,
      "reply"
    );
    onSnapshot(query(docRef, orderBy("timestamp", "desc")), (snapshot) =>
      setRetweetsReplys(snapshot.docs)
    );
  }, [db, retweetInput]);

  // start writing reply
  const showReplyInput = () => {
    setShowReply(!isShowReply);
  };

  // store re tweet text
  const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRetweetInput(e.target.value);
  };

  // retweet reply submit
  const handlerSubmit = async () => {
    setLoading(true);
    const docRef = collection(
      db,
      "posts",
      docId,
      "comments",
      comment.id,
      "reply"
    );
    const replyRef = await addDoc(docRef, {
      text: retweetInput,
      uid: data?.user?.uid,
      name: data?.user?.name,
      username: data?.user.username,
      userImage: data?.user.image,
      timestamp: serverTimestamp(),
    });

    //sent image if available
    if (retweetReplyImage) {
      const storageRef = ref(
        storage,
        `posts/${docId}/comments/${comment?.id}/replys/${replyRef.id}/image`
      );

      await uploadString(storageRef, retweetReplyImage, "data_url").then(
        async () => {
          //getDownloadUrl
          await getDownloadURL(storageRef).then((url) => {
            // update doc with image url
            updateDoc(replyRef, { image: url });
          });
        }
      );
    }

    // empty box
    setRetweetInput("");
    setRetweetReplyImage(null);
    setLoading(false);
  };

  //delete comment
  const handlerDelete = async () => {
    const confirm = window.confirm("Are You Sure To Delete ?");

    if (confirm) {
      const docRef = doc(db, "posts", docId, "comments", comment.id);
      await deleteDoc(docRef);

      //delete image if available
      if (comment?.data()?.image) {
        const imageRef = ref(
          storage,
          `posts/${docId}/comments/${comment.id}/image`
        );
        await deleteObject(imageRef);
      }
    }
  };

  //image picked
  const handlerImagePick = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.length) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      const imageData: string = readerEvent.target?.result as string;
      setRetweetReplyImage(imageData);
    };
  };

  // submit button disability
  const tweetBtnStatus = () => {
    if (retweetInput.trim() || retweetReplyImage) {
      return false;
    }
    return true;
  };

  return (
    <div>
      {/* headers */}
      <div className="flex leading-4 gap-2 items-center">
        <div className="h-8 w-8 rounded-full bg-red-300">
          <img
            src={comment?.data()?.userImage}
            alt=""
            className="cursor-pointer h-full w-full rounded-full"
          />
        </div>
        <div>
          <h4 className="text-[14px] sm:text-[15px] text-gray-700 cursor-pointer hover:underline">
            {comment?.data()?.name}
          </h4>
          <p className="text-[12px] text-gray-400">
            <Moment fromNow>{comment?.data()?.timestamp?.toDate()}</Moment>
          </p>
        </div>
      </div>

      {/* comments body  */}
      <div className="pl-10">
        {/* comments context  */}
        <div className="pt-1 pb-1">
          <p className="text-[13px] sm:text-[14px] text-gray-600">
            {comment?.data()?.text}
          </p>
          {comment?.data()?.image && (
            <div className="h-36 w-1/2 mt-1">
              <img src={comment?.data()?.image} alt="" className="h-full" />
            </div>
          )}
        </div>

        {/* interatins btns  */}
        <div className="flex gap-3">
          <div>
            <ChatBubbleBottomCenterIcon
              className={`h-6 w-6 p-1 cursor-pointer hover:text-red-500 ${
                isShowReply && "text-red-600"
              }`}
              onClick={showReplyInput}
            />
          </div>
          <div>
            <HeartIcon className="h-6 w-6 p-1 cursor-pointer hover:text-red-500" />
          </div>
          <div>
            <ShareIcon className="h-6 w-6 p-1 cursor-pointer hover:text-blue-500" />
          </div>

          <div>
            {data?.user.uid === comment?.data()?.uid && (
              <TrashIcon
                className="h-6 w-6 p-1 cursor-pointer hover:text-red-500"
                onClick={handlerDelete}
              />
            )}
          </div>
        </div>
      </div>

      {/* input section for taking reply */}
      <div className={`${isShowReply ? "inline" : "hidden"}`}>
        {/* {input box} */}
        <div className="mt-4">
          <div className="flex border-b border-gray-200 gap-2">
            <div className="h-10 w-10 rounded-full">
              <img
                src={data?.user.image}
                alt="profile img"
                className="h-full w-full object-cover rounded-full cursor-pointer hover:brightness-95 bg-red-200"
              />
            </div>
            <div className="w-full divide-y divide-gray-20">
              <div>
                <textarea
                  className="w-full focus:ring-0 border-none text-sm :md:text-md placeholder-gray-700 placeholder:capitalize tracking-wide min-h-[50px] text-gray-700 customScrollbar"
                  name=""
                  id=""
                  placeholder="tweet your reply . . ."
                  onChange={handlerChange}
                  value={retweetInput!}
                />
              </div>
              {/* preview image section */}
              <div className={` relative flex justify-left w-full`}>
                {retweetReplyImage && (
                  <>
                    <XMarkIcon
                      className={` ${
                        loading && "hidden"
                      } cursor-pointer absolute top-1 left-1 h-5 text-[#e50914] hover:bg-[rgba(0,0,0,0.4)] transition-all duration-200 bg-[rgba(0,0,0,0.3)] rounded-full`}
                      onClick={() => setRetweetReplyImage(null)}
                    />
                    <img src={retweetReplyImage} alt="" className="w-[16rem]" />
                  </>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <PhotoIcon
                    className="h-9 w-9 hoverEffect p-1.5 text-sky-500 hover:text-sky-400"
                    onClick={() => imagePicker.current?.click()}
                  />
                  <input
                    type="file"
                    hidden
                    ref={imagePicker}
                    onChange={handlerImagePick}
                  />
                  <FaceSmileIcon className="h-9 w-9 hoverEffect p-1.5 text-sky-500 hover:text-sky-400" />
                </div>

                <button
                  className="flex justify-center items-center h-8 w-40 rounded-full capitalize bg-blue-400 text-white font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  disabled={tweetBtnStatus()}
                  onClick={handlerSubmit}
                >
                  {!loading ? (
                    "replay tweet"
                  ) : (
                    <LoaderSVG color="fill-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sub comments  */}
      <div className="relative pl-4 mt-4 flex flex-col gap-3">
        <div className="absolute -z-10 h-full border-l ml-4 border-gray-200"></div>
        {retweetReplys.map((retweet, index) => {
          return (
            <SubComments
              key={index}
              retweet={retweet}
              docId={docId}
              commentId={comment?.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;

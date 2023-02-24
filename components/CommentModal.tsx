import { ChangeEvent, useEffect, useRef, useState } from "react";
import { commentModalState, docIdState } from "@/atom/CommentModalState";
import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import LoaderSVG from "./LoaderSVG";
import Post from "./Post";
import Comments from "./Comments";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CommentModal = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpenCommentM, setOpenCommentM] =
    useRecoilState<boolean>(commentModalState);
  const docId = useRecoilValue(docIdState);
  const [post, setPost] = useState<DocumentData>({});
  const [comments, setComments] = useState<DocumentData[]>([]);
  const { data } = useSession();
  const [commentInput, setCommentInput] = useState<string>("");
  const imagePicker = useRef<HTMLInputElement | null>(null);
  const [retweetImage, setRetweetImage] = useState<string | null>(null);
  const [tweetBtnLoading, setTweetBtnLoading] = useState<boolean>(false);

  // request for get post
  const fetchPost = async () => {
    const docRef = doc(db, "posts", docId);
    await getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setPost(doc.data());
          setLoading(false);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  };
  const fetchComments = () => {
    const commentsRef = collection(db, "posts", docId, "comments");
    onSnapshot(query(commentsRef, orderBy("timestamp", "desc")), (snapshot) =>
      setComments(snapshot.docs)
    );
  };
  // get post
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [docId, db]);

  // take comment text
  const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  // submit reply tweet
  const handlerSubmit = async () => {
    setTweetBtnLoading(true);
    // const userId = data?.user.uid as string;
    const docRef = collection(db, "posts", docId, "comments");
    const commentRef = await addDoc(docRef, {
      text: commentInput,
      uid: data?.user.uid,
      name: data?.user?.name,
      username: data?.user.username,
      userImage: data?.user.image,
      timestamp: serverTimestamp(),
    });

    // set images
    if (retweetImage) {
      const storageRef = ref(
        storage,
        `posts/${docId}/comments/${commentRef.id}/image`
      );
      // upload image string
      await uploadString(storageRef, retweetImage, "data_url").then(
        async () => {
          //get the download link of this image
          await getDownloadURL(storageRef).then((url) => {
            const commentRefWId = doc(
              db,
              "posts",
              docId,
              "comments",
              commentRef.id
            );
            //update the comments  doc with image downloadLink
            updateDoc(commentRefWId, { image: url });
          });
        }
      );
    }
    // comment box reset
    setCommentInput("");
    // image box reset
    setRetweetImage(null);
    //tweet loading stop
    setTweetBtnLoading(false);
  };

  // for picking image
  const handlerImagePick = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.length) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      const imageData: string = readerEvent.target?.result as string;
      setRetweetImage(imageData);
    };
  };

  // tweet button status for disabling reply tweet btn
  const tweetBtnStatus = () => {
    if (commentInput.trim() || retweetImage) {
      return false;
    }
    return true;
  };

  return (
    <div className="absolute top-[20%] left-1/2 translate-x-[-50%] z-10">
      <Modal open={isOpenCommentM} onClose={() => setOpenCommentM(false)}>
        {loading ? (
          <div className="commentModal customScrollbar flex justify-center">
            <LoaderSVG color="fill-gray-700" />
          </div>
        ) : (
          <div className=" commentModal customScrollbar">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2 leading-5">
                <div className="h-8 w-8 bg-red-300 rounded-full">
                  <img
                    src={post?.userImage}
                    alt=""
                    className="h-full w-full object-cover rounded-full cursor-pointer"
                  />
                </div>
                <div>
                  <h4 className="text-gray-700 font-bold text-md hover:underline cursor-pointer">
                    {post?.name}
                  </h4>
                  <p className="text-gray-400 text-[13px] hover:underline cursor-pointer">
                    @{post?.username}
                  </p>
                </div>
              </div>
              <div>
                <XMarkIcon
                  onClick={() => setOpenCommentM(false)}
                  className="h-7 text-gray-600 hover:text-[#e50914] cursor-pointer transitin-all duration-200"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-gray-700">
                <p>{post?.text}</p>
              </div>
              <div className="w-full">
                {post?.image && (
                  <img
                    src={post?.image}
                    alt=""
                    className=" h-[22rem] w-full object-contain"
                  />
                )}
              </div>
            </div>

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
                      value={commentInput!}
                    />
                  </div>
                  {/* preview image section */}
                  <div className={` relative flex justify-left w-full`}>
                    {retweetImage && (
                      <>
                        <XMarkIcon
                          className={` ${
                            tweetBtnLoading && "hidden"
                          } cursor-pointer absolute top-2 left-2 h-6 text-[#e50914] hover:bg-[rgba(0,0,0,0.4)] transition-all duration-200 bg-[rgba(0,0,0,0.3)] rounded-full`}
                          onClick={() => setRetweetImage(null)}
                        />
                        <img src={retweetImage} alt="" className=" w-[18rem]" />
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
                      className="flex justify-center items-center h-8 w-20 rounded-full capitalize bg-blue-400 text-white font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                      disabled={tweetBtnStatus()}
                      onClick={handlerSubmit}
                    >
                      tweet
                      {/* {!loading ? "tweet" : <LoaderSVG color="fill-gray-300" />} */}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* view comments section  */}
            <div className="p-1">
              <div>
                <h4 className="capitalize text-sm">all comments</h4>
              </div>
              <div className="flex flex-col gap-4 mt-2 ml-2">
                {comments.map((comment, index) => (
                  <Comments key={index} comment={comment} docId={docId} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommentModal;

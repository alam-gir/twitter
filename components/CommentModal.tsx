import { useEffect, useState } from "react";
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
} from "firebase/firestore";
import { db } from "@/firebase";
import LoaderSVG from "./LoaderSVG";

const CommentModal = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpenCommentM, setOpenCommentM] =
    useRecoilState<boolean>(commentModalState);
  const docId = useRecoilValue(docIdState);
  const [post, setPost] = useState<DocumentData>({});
  const { data } = useSession();
  const [commentInput, setCommentInput] = useState<string>("");

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

  // get post
  useEffect(() => {
    fetchPost();
  }, [docId, db]);

  // take comment text
  const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  // sunmit reply tweet
  const handlerSubmit = async () => {
    const userId = data?.user.uid as string;

    await addDoc(collection(db, "posts", docId, "comments"), {
      text: commentInput,
      uid: userId,
      username: data?.user.username,
      userImage: data?.user.image,
      timestamp: serverTimestamp(),
    });
    setCommentInput("");
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
                  <div className={` relative flex justify-center w-full`}>
                    {/* {selectedImage && (
                    <>
                    <XMarkIcon
                    className={` ${
                      loading && "hidden"
                    } cursor-pointer absolute top-5 left-3 h-7 text-[#e50914] hover:bg-[rgba(0,0,0,0.4)] transition-all duration-200 bg-[rgba(0,0,0,0.3)] rounded-full`}
                    // onClick={() => setSelectedImage(null)}
                    />
                    <img src={"selectedImage"} alt="" className="max-w-full" />
                    </>
                  )} */}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <PhotoIcon
                        className="h-9 w-9 hoverEffect p-1.5 text-sky-500 hover:text-sky-400"
                        // onClick={() => imagePicker.current?.click()}
                      />
                      <input
                        type="file"
                        hidden
                        // ref={imagePicker}
                        // onChange={handlerImagePick}
                      />
                      <FaceSmileIcon className="h-9 w-9 hoverEffect p-1.5 text-sky-500 hover:text-sky-400" />
                    </div>

                    <button
                      className="flex justify-center items-center h-8 w-20 rounded-full capitalize bg-blue-400 text-white font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                      // disabled={tweetBtnStatus()}
                      onClick={handlerSubmit}
                    >
                      tweet
                      {/* {!loading ? "tweet" : <LoaderSVG color="fill-gray-300" />} */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommentModal;

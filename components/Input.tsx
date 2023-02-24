import { PostedState } from "@/atom/Posted";
import { db, storage } from "@/firebase";
import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import LoaderSVG from "./LoaderSVG";

const Input = () => {
  const { data } = useSession();
  const [postText, setPostText] = useState<string>("");
  const imagePicker = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };
  const handlerSubmit = async () => {
    // start loading
    setLoading(true);

    const dbRef = collection(db, "posts");
    const post = {
      uid: data?.user.uid,
      name: data?.user.name,
      username: data?.user.username,
      userImage: data?.user.image,
      text: postText,
      timestamp: serverTimestamp(),
    };
    // set document
    const docRef = await addDoc(dbRef, post);
    //upload image ** upload string only can take string ,
    if (selectedImage) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedImage, "data_url").then(async () => {
        //update document with download link
        const docRefWId = doc(db, "posts", docRef.id);
        //get image download link
        await getDownloadURL(imageRef).then((url) =>
          updateDoc(docRefWId, { image: url })
        );
      });
    }
    // make empty the post input box
    setPostText("");
    // make selected image empty
    setSelectedImage(null);
    // stop loading
    setLoading(false);
  };
  const handlerImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.length) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      const imageData: string = readerEvent?.target?.result as string;
      setSelectedImage(imageData);
    };
  };

  const tweetBtnStatus = () => {
    if (loading) {
      return true;
    }
    if (postText.trim() || selectedImage) {
      return false;
    } else return true;
  };
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src={data?.user.image}
        alt="profile img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div>
          <textarea
            className="w-full focus:ring-0 border-none text-lg placeholder-gray-700 placeholder:capitalize tracking-wide min-h-[50px] text-gray-700"
            name=""
            id=""
            placeholder="what's happening?"
            onChange={handlerChange}
            value={postText}
          />
        </div>
        {/* preview image section */}
        <div
          className={`${
            selectedImage && "py-2"
          } relative flex justify-center w-full`}
        >
          {selectedImage && (
            <>
              <XMarkIcon
                className={` ${
                  loading && "hidden"
                } cursor-pointer absolute top-5 left-3 h-7 text-[#e50914] hover:bg-[rgba(0,0,0,0.4)] transition-all duration-200 bg-[rgba(0,0,0,0.3)] rounded-full`}
                onClick={() => setSelectedImage(null)}
              />
              <img src={selectedImage} alt="" className="max-w-full" />
            </>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <PhotoIcon
              className="h-11 w-11 hoverEffect p-2 text-sky-500 hover:text-sky-400"
              onClick={() => imagePicker.current?.click()}
            />
            <input
              type="file"
              hidden
              ref={imagePicker}
              onChange={handlerImagePick}
            />
            <FaceSmileIcon className="h-11 w-11 hoverEffect p-2 text-sky-500 hover:text-sky-400" />
          </div>

          <button
            className="flex justify-center items-center h-10 w-32 rounded-full capitalize bg-blue-400 text-white font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            disabled={tweetBtnStatus()}
            onClick={handlerSubmit}
          >
            {!loading ? "tweet" : <LoaderSVG color="fill-gray-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;

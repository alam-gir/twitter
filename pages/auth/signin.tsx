import { signIn } from "next-auth/react";
import React from "react";

const signin = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-3">
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="bg-[#e50914] text-white py-2 px-4 text-lg"
      >
        sign in with {"GITHUB"}
      </button>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-[#e50914] text-white py-2 px-4 text-lg"
      >
        sign in with {"GOOGLE"}
      </button>
    </div>
  );
};

export default signin;

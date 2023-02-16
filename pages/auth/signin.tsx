import {} from "next-auth/providers";
import { signIn } from "next-auth/react";
import React from "react";

const signin = () => {
  return (
    <div>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        sign in with {"GITHUB"}
      </button>
    </div>
  );
};

export default signin;

import { signIn } from "next-auth/react";
import React from "react";

const signin = () => {
  return (
    <div>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        sign in with {"GITHUB"}
      </button>
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        sign in with {"GOOGLE"}
      </button>
    </div>
  );
};

export default signin;

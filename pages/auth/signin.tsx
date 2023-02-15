import { GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";
import { AppProvider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const signin = ({
  session,
  providers,
}: {
  session: Session;
  providers: AppProvider;
}) => {
  console.log("providers from signin page - ", providers);
  return (
    <div>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default signin;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const providers = await getProviders();
  console.log("fom server,, provider - ", providers, "session - ", session);

  return {
    props: {
      providers: providers ?? [],
      session: session ?? null,
    },
  };
};

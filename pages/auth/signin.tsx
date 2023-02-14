import { AppProvider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
interface SigninProps {
  providers: AppProvider;
}
export default function SignIn({ providers }: SigninProps) {
  return (
    <div className="flex h-screen w-screen items-center">
      <div className="hidden sm:flex h-full sm:w-[50%] items-center bg-red-200">
        <img
          src="https://www.techbooky.com/wp-content/uploads/2021/07/4859E08D-388B-4475-9FCC-C05914CC654A.png"
          alt=""
          className="w-full h-auto h-auto object-contain "
        />
      </div>
      <div className="bg-green-200 h-full sm:w-[50%] w-[100%] flex flex-col items-center justify-center gap-2">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg text-white transition-all duration-200 capitalize font-bold text-md tracking-wide"
            >
              Sign in with{" "}
              <span className="text-gray-700">{provider.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

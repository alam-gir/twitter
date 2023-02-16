import NextAuth, { Profile, Session } from "next-auth";
import { OAuthConfig } from "next-auth/providers";
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }) as OAuthConfig<Profile>,
    // ...add more providers here
  ],
  // ...add Pages
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
};
export default NextAuth(authOptions);

import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      username: string;
      image: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}

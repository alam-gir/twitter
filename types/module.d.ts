declare module NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
    NEXT_PUBLIC_GITHUB_CLIENT_SECRET: string;
  }
}

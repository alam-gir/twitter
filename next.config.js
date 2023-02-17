/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["help.twitter.com"],
  },

  env: {
    FIREBASE_API_KEY: "AIzaSyDDRnjoqMvLC1X7sS5eNcaY6Aeq710IOOk",
    GOOGLE_CLIENT_ID:
      "457027614316-4idias0je36gu4t380g29i9akr2tf0b3.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    GITHUB_CLIENT_ID: "38d2319f951173061bd3",
    GITHUB_CLIENT_SECRET: "95e66dd024a8ee66fe9fad88271c62f05602da46",
    NEXTAUTH_SECRET: "6ee+YVKfDv3azkcbRZTH0+J+gONHaCU7thWuiZfLr9Y=",
  },
};

module.exports = nextConfig;

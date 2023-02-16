/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["help.twitter.com"],
  },

  env: {
    FIREBASE_API_KEY: "AIzaSyDDRnjoqMvLC1X7sS5eNcaY6Aeq710IOOk",
    GOOGLE_CLIENT_ID:
      "457027614316-se2sv74c2cd49ch4qhbidkv6hqthk43q.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    GITHUB_CLIENT_ID: "38d2319f951173061bd3",
    GITHUB_CLIENT_SECRET: "95e66dd024a8ee66fe9fad88271c62f05602da46",
    NEXTAUTH_SECRET: "6ee+YVKfDv3azkcbRZTH0+J+gONHaCU7thWuiZfLr9Y=",
  },
};

module.exports = nextConfig;

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-a6a14.firebaseapp.com",
  projectId: "twitter-a6a14",
  storageBucket: "twitter-a6a14.appspot.com",
  messagingSenderId: "457027614316",
  appId: "1:457027614316:web:35a9eeff947f5159daca49",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };

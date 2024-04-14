import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB88R9DdxhFZGn-S3FgT9H0o4swE2-Ju2Q",
  authDomain: "fir-chat-app-e058e.firebaseapp.com",
  projectId: "fir-chat-app-e058e",
  storageBucket: "fir-chat-app-e058e.appspot.com",
  messagingSenderId: "815915437915",
  appId: "1:815915437915:web:eaec5e2deb007f834dd47e",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

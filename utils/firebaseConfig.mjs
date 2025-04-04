// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBEZWM6aD6-ToSXUm2HSizZBC0C_qwzQZY",
  authDomain: "lastbite-9e4d0.firebaseapp.com",
  projectId: "lastbite-9e4d0",
  storageBucket: "lastbite-9e4d0.appspot.com",
  messagingSenderId: "793251156912",
  appId: "1:793251156912:android:49390c53d28a454ef93c75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ensure persistence for React Native apps
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, signInWithPhoneNumber };

// utils/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBEZWM6aD6-ToSXUm2HSizZBC0C_qwzQZY",
  authDomain: "lastbite-9e4d0.firebaseapp.com",
  projectId: "lastbite-9e4d0",
  storageBucket: "lastbite-9e4d0.appspot.com",
  messagingSenderId: "793251156912",
  appId: "1:793251156912:android:49390c53d28a454ef93c75"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3ad6e.firebaseapp.com",
  projectId: "mern-estate-3ad6e",
  storageBucket: "mern-estate-3ad6e.appspot.com",
  messagingSenderId: "803443242975",
  appId: "1:803443242975:web:a102d68c35bc8e8a99f66a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
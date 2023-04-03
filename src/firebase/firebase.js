import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "authentication-b5563.firebaseapp.com",
  projectId: "authentication-b5563",
  storageBucket: "authentication-b5563.appspot.com",
  messagingSenderId: "534514006446",
  appId: "1:534514006446:web:71952e80a8c6ed6004b03f",
  measurementId: "G-BFRZX1F12Z",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();


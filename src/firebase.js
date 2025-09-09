// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAYGKBT9jj3XH022DjC_fbgBYB6ck0qWgE",
  authDomain: "loginsignup-ab1ec.firebaseapp.com",
  projectId: "loginsignup-ab1ec",
  storageBucket: "loginsignup-ab1ec.firebasestorage.app",
  messagingSenderId: "825480107321",
  appId: "1:825480107321:web:a05e6384ef0d62475404e8",
  measurementId: "G-5LVLKMXQBT"
};

const app = initializeApp(firebaseConfig);

// Named exports used by AuthPage.jsx
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Optional: only enable Analytics in the browser (avoids “window is not defined”)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

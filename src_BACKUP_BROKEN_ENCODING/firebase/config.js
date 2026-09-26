import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOd3NQe1mLGkdi3xfrC0gvE0huFAq_KK0",
  authDomain: "neidah.firebaseapp.com",
  databaseURL: "https://neidah-default-rtdb.firebaseio.com",
  projectId: "neidah",
  storageBucket: "neidah.firebasestorage.app",
  messagingSenderId: "612405183822",
  appId: "1:612405183822:web:0b6ec7f74283ca28da4a1f",
  measurementId: "G-BFL5RX2XX0"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export default app;

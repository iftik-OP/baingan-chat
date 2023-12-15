import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLV_PQrS6Tw8rfTSXuTgSBMaRui71ivmo",
  authDomain: "react-app-e70fb.firebaseapp.com",
  projectId: "react-app-e70fb",
  storageBucket: "react-app-e70fb.appspot.com",
  messagingSenderId: "367010233455",
  appId: "1:367010233455:web:d5a72547522116ced8a19a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()





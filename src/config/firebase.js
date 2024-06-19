import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPpe9QzkSPxI_wB0IG8JSkXIGxneHrgdM",
  authDomain: "chat-app-lk7nv.firebaseapp.com",
  projectId: "chat-app-lk7nv",
  storageBucket: "chat-app-lk7nv.appspot.com",
  messagingSenderId: "779583611115",
  appId: "1:779583611115:web:445cec04f70592e2075eae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

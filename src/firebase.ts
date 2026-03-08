import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBi_zVQ4dapi3iyIKP154B7sdo0cLBNffc",
    authDomain: "brs-nardipur-college-website.firebaseapp.com",
    projectId: "brs-nardipur-college-website",
    storageBucket: "brs-nardipur-college-website.firebasestorage.app",
    messagingSenderId: "914879275811",
    appId: "1:914879275811:web:4d6d6f405bd3da4eda2296"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

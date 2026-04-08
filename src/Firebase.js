// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPx_cyZETd0gW5IRu2PTMkQPnw2fIYwkc",
  authDomain: "eshop-a541d.firebaseapp.com",
  projectId: "eshop-a541d",
  storageBucket: "eshop-a541d.firebasestorage.app",
  messagingSenderId: "43519131844",
  appId: "1:43519131844:web:3e916e0ba354fa83450991",
  measurementId: "G-3BHP2NLHBH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword };

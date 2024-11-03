// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBGYGYckJ1QQKwvcOa6-YhEDnufMYc_zDc",
    authDomain: "veridrop-e62d3.firebaseapp.com",
    projectId: "veridrop-e62d3",
    storageBucket: "veridrop-e62d3.firebasestorage.app",
    messagingSenderId: "119825127004",
    appId: "1:119825127004:web:9859178425b00496a87899",
    measurementId: "G-BZHPE89BRM",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };

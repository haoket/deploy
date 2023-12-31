// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoLjPWDgvfskwjXpvEPC6g2nhG57VOZe4",
    authDomain: "shop-400208.firebaseapp.com",
    projectId: "shop-400208",
    storageBucket: "shop-400208.appspot.com",
    messagingSenderId: "238834383367",
    appId: "1:238834383367:web:a460920d088992e47fc8a2",
    measurementId: "G-ZNJN6V68D9"
};

// Initialize Firebase
export const firebaseConnect = initializeApp(firebaseConfig);

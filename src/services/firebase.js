// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc0dGkBKXhK_0AcfXFo2aHvoWXQHu0VEY",
  authDomain: "english-master-5ca79.firebaseapp.com",
  databaseURL: "https://english-master-5ca79-default-rtdb.firebaseio.com",
  projectId: "english-master-5ca79",
  storageBucket: "english-master-5ca79.firebasestorage.app",
  messagingSenderId: "1003173994906",
  appId: "1:1003173994906:web:a85404f0c521270a8d1a23",
  measurementId: "G-S1T3737QG1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

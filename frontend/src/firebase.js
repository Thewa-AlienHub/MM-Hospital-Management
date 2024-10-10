// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "masterminddatabase-d8f27.firebaseapp.com",
  databaseURL: "https://masterminddatabase-d8f27-default-rtdb.firebaseio.com",
  projectId: "masterminddatabase-d8f27",
  storageBucket: "masterminddatabase-d8f27.appspot.com",
  messagingSenderId: "50342420195",
  appId: "1:50342420195:web:e813a931f2cac715f36fd6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

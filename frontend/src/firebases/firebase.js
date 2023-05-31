// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth"; 
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHqupPcpKO9DPVAsal4N4gyum_HV5IGLI",
  authDomain: "login-by-gg-d3e52.firebaseapp.com",
  projectId: "login-by-gg-d3e52",
  storageBucket: "login-by-gg-d3e52.appspot.com",
  messagingSenderId: "91199203043",
  appId: "1:91199203043:web:a0b2f29865d9b2e10747d6",
  measurementId: "G-NTYJ5SGQWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
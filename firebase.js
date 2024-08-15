// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiChdKGroUFvaKEMu2ZJVyWlqM9PP3rVM",
  authDomain: "flashcard-saas-d5e55.firebaseapp.com",
  projectId: "flashcard-saas-d5e55",
  storageBucket: "flashcard-saas-d5e55.appspot.com",
  messagingSenderId: "999981212790",
  appId: "1:999981212790:web:602fed16e65f37be40eb57",
  measurementId: "G-ZTMCZ5LJF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
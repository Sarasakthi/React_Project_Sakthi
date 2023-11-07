// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCXoLidgKQK7_3QaKnBJ1azU4m-RqHfLM",
  authDomain: "react-project-sakthi.firebaseapp.com",
  projectId: "react-project-sakthi",
  storageBucket: "react-project-sakthi.appspot.com",
  messagingSenderId: "169917503457",
  appId: "1:169917503457:web:963f54cf979792e3e164a0",
  measurementId: "G-DT3WKM3GH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
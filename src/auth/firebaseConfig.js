// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcWFxklzIsJtIbwVpHvTYoy6zDI5-ccsU",
  authDomain: "giraffe-8f14e.firebaseapp.com",
  projectId: "giraffe-8f14e",
  storageBucket: "giraffe-8f14e.appspot.com",
  messagingSenderId: "101030949212",
  appId: "1:101030949212:web:df64c25bb96c39a752d199",
  measurementId: "G-L5RN4YXSRN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };

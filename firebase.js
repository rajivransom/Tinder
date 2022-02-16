// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //hidestream
  apiKey: "AIzaSyBMA7eCnBasGY034M8oiNJckoYQBEKeWDA",
  authDomain: "tinder-2-aa87f.firebaseapp.com",
  projectId: "tinder-2-aa87f",
  storageBucket: "tinder-2-aa87f.appspot.com",
  messagingSenderId: "1040634103587",
  appId: "1:1040634103587:web:f2c44575533a7ee306ae96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export { auth, db };

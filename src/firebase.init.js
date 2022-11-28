// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlW6puHFs7fT0_iUWULxw_YUu4vUm3zR4",
  authDomain: "food-ninja-38ec5.firebaseapp.com",
  projectId: "food-ninja-38ec5",
  storageBucket: "food-ninja-38ec5.appspot.com",
  messagingSenderId: "402953178486",
  appId: "1:402953178486:web:34d3b8d0f7b3e49a9d3e57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU3zKcrbYtbC8oj1R8RgoKCuz3H3nEgSo",
  authDomain: "netflixgpt-e5f0e.firebaseapp.com",
  projectId: "netflixgpt-e5f0e",
  storageBucket: "netflixgpt-e5f0e.appspot.com",
  messagingSenderId: "400686238033",
  appId: "1:400686238033:web:38ebc1b1ee34b5741e6b70",
  measurementId: "G-VGGTP4ZP2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
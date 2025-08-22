

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyCfun4kx91qCpqFLuXYRyLm7efICCpRssg",
    authDomain: "vedportfolio-6f924.firebaseapp.com",
    projectId: "vedportfolio-6f924",
    storageBucket: "vedportfolio-6f924.firebasestorage.app",
    messagingSenderId: "741504570969",
    appId: "1:741504570969:web:9405d26ed1141fcb990348",
    measurementId: "G-9TXV725WT0"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };



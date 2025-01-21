// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBC5FeJc6ZlsEXS1PcC_TtRqFRF6wTEo-I",
    authDomain: "digisir.firebaseapp.com",
    projectId: "digisir",
    storageBucket: "digisir.firebasestorage.app",
    messagingSenderId: "501673623738",
    appId: "1:501673623738:web:d846343640db481410c283",
    measurementId: "G-VG9DP8V3RL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
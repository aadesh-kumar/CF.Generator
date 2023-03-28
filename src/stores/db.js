import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCMHEYvwOZjiUSvhLzufAPvOAQu9K8mnbs",
    authDomain: "cf-generator.firebaseapp.com",
    projectId: "cf-generator",
    storageBucket: "cf-generator.appspot.com",
    messagingSenderId: "459949947821",
    appId: "1:459949947821:web:0400d852e12cc2c7e07f24",
    measurementId: "G-GZ0FL04X17",
};

const app = initializeApp(firebaseConfig);
export const db = (getFirestore(app));
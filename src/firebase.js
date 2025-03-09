import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOmgh-bwztV2Ikuca2KqCjeZFQmVEOPjs",
    authDomain: "codehive-bcd90.firebaseapp.com",
    projectId: "codehive-bcd90",
    storageBucket: "codehive-bcd90.appspot.com",
    messagingSenderId: "300677091996",
    appId: "1:300677091996:web:c47af18d9e43f3355fd359"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };

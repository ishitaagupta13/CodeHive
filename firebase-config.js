// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOmgh-bwztV2Ikuca2KqCjeZFQmVEOPjs",
    authDomain: "codehive-bcd90.firebaseapp.com",
    projectId: "codehive-bcd90",
    storageBucket: "codehive-bcd90.appspot.com",
    messagingSenderId: "300677091996",
    appId: "1:300677091996:web:c47af18d9e43f3355fd359"
};

// Initialize Firebase (Global firebase object method)
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

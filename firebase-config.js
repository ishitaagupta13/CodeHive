const firebaseConfig = {
    apiKey: "AIzaSyAOmgh-bwztV2Ikuca2KqCjeZFQmVEOPjs",
    authDomain: "codehive-bcd90.firebaseapp.com",
    projectId: "codehive-bcd90",
    storageBucket: "codehive-bcd90.appspot.com",
    messagingSenderId: "300677091996",
    appId: "1:300677091996:web:c47af18d9e43f3355fd359"
};

// Initialize Firebase (using the correct version of Firebase)
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
window.auth = auth;
window.db = db;
window.provider = provider;
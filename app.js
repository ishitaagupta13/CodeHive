// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, updateDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOmgh-bwztV2Ikuca2KqCjeZFQmVEOPjs",
  aumessagingSenderId: "300677091996",
  appId: "1:300677091996:web:c47af18d9e43f3355fd359",thDomain: "codehive-bcd90.firebaseapp.com",
  projectId: "codehive-bcd90",
  storageBucket: "codehive-bcd90.firebasestorage.app",
  
  measurementId: "G-LFEN8D4SR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

// Export initialized Firebase instances
export { app, auth, db, analytics, provider, serverTimestamp };


//USER REGISTRATION
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User Registered:", user);

            // Store user in Firestore
            return db.collection("users").doc(user.uid).set({
                name: name,
                email: email,
                registeredAt: new Date()
            });
        })
        .then(() => {
            alert("Registration Successful!");
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
});





//USER LOGIN
function loginUser() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Logged in:", userCredential.user);
            alert("Login Successful!");
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
}



//STORE DATA IN FIRESTORE
function registerHackathon(name, email) {
    db.collection("hackathonRegistrations").add({
        name: name,
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Successfully registered for the hackathon!");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

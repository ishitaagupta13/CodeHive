document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection("users").doc(user.uid).set({
                email: email,
                role: role,
                registeredAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("Signup Successful! 🎉");
            redirectToDashboard(role);
        })
        .catch((error) => {
            console.error("Registration error:", error);
            alert(error.message);
        });
});

// For email/password login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            db.collection("users").doc(userCredential.user.uid).get()
                .then(doc => redirectToDashboard(doc.data().role));
        })
        .catch((error) => {
            console.error("Login error:", error);
            alert(error.message);
        });
});

// Google Sign In Function
function signInWithGoogle() {
    console.log("Google sign-in initiated");
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("Google Sign-In Successful:", user);
            
            // Check if this user already exists in our database
            return db.collection("users").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        // User exists, just redirect to appropriate dashboard
                        console.log("Existing user, logging in");
                        return redirectToDashboard(doc.data().role);
                    } else {
                        // New user, create profile
                        console.log("New user, creating profile");
                        // Default role can be 'participant' or show role selection UI
                        const role = "participant"; // Default role
                        return db.collection("users").doc(user.uid).set({
                            email: user.email,
                            name: user.displayName,
                            photoURL: user.photoURL,
                            role: role,
                            registeredAt: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            redirectToDashboard(role);
                        });
                    }
                });
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error);
            alert(error.message);
        });
}

// Add event listeners for your Google sign-in buttons
document.addEventListener("DOMContentLoaded", function() {
    // For login page
    const googleLoginBtn = document.getElementById("google-login-btn");
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Google login button clicked");
            signInWithGoogle();
        });
    }

    // For registration page
    const googleRegisterBtn = document.getElementById("google-register-btn");
    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Google register button clicked");
            signInWithGoogle();
        });
    }
});

// Redirect function
function redirectToDashboard(role) {
    if (!role) {
        // Default to participant if role is undefined or null
        window.location.href = "participant-dashboard.html";
        return;
    }
    
    if (role === "participant") window.location.href = "participant-dashboard.html";
    if (role === "judge") window.location.href = "judge-dashboard.html";
    if (role === "organizer") window.location.href = "organizer-dashboard.html";
}

// Logout Function
document.getElementById("logout-btn")?.addEventListener("click", function () {
    auth.signOut()
        .then(() => {
            alert("Logged Out Successfully! 🔒");
            window.location.href = "index.html";  // Redirect to home page
        })
        .catch((error) => {
            alert(error.message);
        });
});
// Signup Function
document.getElementById("signup-btn").addEventListener("click", function () {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Signup Successful! 🎉");
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Login Function
document.getElementById("login-btn").addEventListener("click", function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login Successful! ✅");
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Google Login Function
document.getElementById("google-login-btn").addEventListener("click", function () {
    auth.signInWithPopup(provider)
        .then((result) => {
            alert("Google Login Successful! 🎉");
        })
        .catch((error) => {
            console.error("Google Login Error:", error);
            alert(error.message);
        });
});

// Logout Function
document.getElementById("logout-btn").addEventListener("click", function () {
    auth.signOut()
        .then(() => {
            alert("Logged Out Successfully! 🔒");
        })
        .catch((error) => {
            alert(error.message);
        });
});

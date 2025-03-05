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
                role: role
            });
        })
        .then(() => {
            alert("Signup Successful! 🎉");
            redirectToDashboard(role);
        })
        .catch((error) => alert(error.message));
});

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            db.collection("users").doc(userCredential.user.uid).get()
                .then(doc => redirectToDashboard(doc.data().role));
        })
        .catch((error) => alert(error.message));
});

function redirectToDashboard(role) {
    if (role === "participant") window.location.href = "participant-dashboard.html";
    if (role === "judge") window.location.href = "judge-dashboard.html";
    if (role === "organizer") window.location.href = "organizer-dashboard.html";
}
// Google Login Function
document.getElementById("google-login-btn").addEventListener("click", function () {
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Google Sign-In Successful:", result.user);
            alert(`Welcome, ${result.user.displayName}! 🎉`);
            window.location.href = "dashboard.html";  // Redirect after login
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error);
            alert(error.message);
        });
});

// Logout Function
document.getElementById("logout-btn").addEventListener("click", function () {
    auth.signOut()
        .then(() => {
            alert("Logged Out Successfully! 🔒");
            window.location.href = "index.html";  // Redirect to home page
        })
        .catch((error) => {
            alert(error.message);
        });
});

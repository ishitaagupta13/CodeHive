document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    // Button animation on submit
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let button = loginForm.querySelector("button");
        button.innerText = "Logging in...";
        button.style.background = "#ffa600";

        setTimeout(() => {
            button.innerText = "Login";
            button.style.background = "#ff7b00";
        }, 2000);
    });
});

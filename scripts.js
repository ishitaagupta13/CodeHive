document.addEventListener("DOMContentLoaded", () => {
    // Button Animation
    const heroBtn = document.querySelector(".btn");
    if (heroBtn) {
        heroBtn.addEventListener("mouseover", () => {
            document.querySelector(".hero").style.transform = "scale(1.05)";
        });

        heroBtn.addEventListener("mouseout", () => {
            document.querySelector(".hero").style.transform = "scale(1)";
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    // Button animation on submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let button = form.querySelector("button");
        button.innerText = "Registering...";
        button.style.background = "#ffa600";

        setTimeout(() => {
            button.innerText = "Register";
            button.style.background = "#ff7b00";
        }, 2000);
    });
});

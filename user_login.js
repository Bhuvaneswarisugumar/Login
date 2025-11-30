function generateCaptcha() {
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("captchaText").textContent = captcha;
}

// Show form only after Start button
document.getElementById("startBtn").addEventListener("click", function () {
    document.getElementById("startBox").style.display = "none";
    document.getElementById("userLoginForm").style.display = "block";
    generateCaptcha();
});

// Refresh CAPTCHA
document.getElementById("refreshCaptcha").addEventListener("click", function () {
    generateCaptcha();
});

// Password eye toggle
document.getElementById("toggleEye").addEventListener("click", function () {
    let passField = document.getElementById("password");
    passField.type = passField.type === "password" ? "text" : "password";
});

// Login Form Validation
document.getElementById("userLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let captchaInput = document.getElementById("captchaInput").value.trim();
    let captchaText = document.getElementById("captchaText").textContent;

    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");
    let captchaError = document.getElementById("captchaError");
    let successMsg = document.getElementById("successMsg");

    emailError.textContent = "";
    passError.textContent = "";
    captchaError.textContent = "";
    successMsg.textContent = "";

    let valid = true;

    // Email Validation
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email.";
        valid = false;
    }

    // Password Validation
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&!]).{8,}$/;
    if (!passPattern.test(password)) {
        passError.textContent =
            "Password must be 8+ chars, contain upper/lowercase, number & special char.";
        valid = false;
    }

    // CAPTCHA Validation
    if (captchaInput !== captchaText) {
        captchaError.textContent = "Incorrect CAPTCHA!";
        valid = false;
        generateCaptcha();
    }

    if (valid) {
        successMsg.textContent = "Login Successful!";

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(email);
        localStorage.setItem("users", JSON.stringify(users));
    }
});

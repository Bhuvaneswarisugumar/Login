document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");
    let successMsg = document.getElementById("successMsg");

    emailError.textContent = "";
    passError.textContent = "";
    successMsg.textContent = "";

    let valid = true;

    // Email validation
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email address.";
        valid = false;
    }

    // Password validation
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&!]).{8,}$/;
    if (!passPattern.test(password)) {
        passError.textContent =
            "Password must be 8+ chars with upper, lower, digit & special char.";
        valid = false;
    }

    if (valid) {
        successMsg.textContent = "Login successful!";

        // Store user email in localStorage for admin panel
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(email);
        localStorage.setItem("users", JSON.stringify(users));
    }
});

// Show / Hide password
document.getElementById("toggleEye").addEventListener("click", function () {
    let passField = document.getElementById("password");
    passField.type = passField.type === "password" ? "text" : "password";
});

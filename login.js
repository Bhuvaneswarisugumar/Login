// --------------------------------------------------
// Read / Write Users
// --------------------------------------------------
function readUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(arr) {
    localStorage.setItem("users", JSON.stringify(arr));
}

// --------------------------------------------------
// CAPTCHA
// --------------------------------------------------
function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++)
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));

    document.getElementById("captchaText").textContent = captcha;
}
document.getElementById("refreshCaptcha").addEventListener("click", generateCaptcha);
generateCaptcha();

// --------------------------------------------------
// Password Eye
// --------------------------------------------------
document.getElementById("toggleUserEye").addEventListener("click", () => {
    const pass = document.getElementById("userPass");
    pass.type = pass.type === "password" ? "text" : "password";
});

// --------------------------------------------------
// Admin Login
// --------------------------------------------------
document.getElementById("adminForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const a = document.getElementById("adminUser").value.trim();
    const b = document.getElementById("adminPass").value.trim();

    document.getElementById("adminError").textContent = "";

    if (a.toLowerCase() === "admin" && b === "Admin@123") {
        window.location.href = "admin_dashboard.html";
    } else {
        document.getElementById("adminError").textContent = "Invalid admin credentials!";
    }
});

// --------------------------------------------------
// USER LOGIN (FULLY FIXED)
// --------------------------------------------------
document.getElementById("userLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const emailRaw = document.getElementById("userEmail").value.trim();
    const pass = document.getElementById("userPass").value.trim();
    const captInput = document.getElementById("captchaInput").value.trim();
    const captText = document.getElementById("captchaText").textContent;

    document.getElementById("userError").textContent = "";
    document.getElementById("captchaError").textContent = "";
    document.getElementById("userSuccess").textContent = "";

    if (!emailRaw) { document.getElementById("userError").textContent = "Enter email"; return; }
    if (!pass) { document.getElementById("userError").textContent = "Enter password"; return; }

    if (!captInput || captInput.toUpperCase() !== captText.toUpperCase()) {
        document.getElementById("captchaError").textContent = "Incorrect CAPTCHA!";
        generateCaptcha();
        return;
    }

    const email = emailRaw.toLowerCase();

    // IMPORTANT: let (NOT const)
    let users = readUsers();

    let user = users.find(u =>
        (u.email || "").toLowerCase() === email &&
        u.password === pass
    );

    if (!user) {
        document.getElementById("userError").textContent = "Invalid email or password";
        return;
    }

    // -------------------------------
    //  FIXED: Update lastLogin
    // -------------------------------
    users = users.map(u => {
        if ((u.email || "").toLowerCase() === email) {
            return {
                ...u,
                lastLogin: new Date().toLocaleString()
            };
        }
        return u;
    });

    saveUsers(users);

    document.getElementById("userSuccess").textContent = "Login successful! Redirecting...";

    setTimeout(() => {
        localStorage.setItem("currentUser", JSON.stringify({
            email: user.email,
            name: user.name
        }));

        window.location.href = "user_dashboard.html";
    }, 700);
});

// --------------------------------------------------
// Forgot Password Popup
// --------------------------------------------------
function openPopup() {
    document.getElementById("forgotPopup").style.display = "flex";
}
function closePopup() {
    document.getElementById("forgotPopup").style.display = "none";
    document.getElementById("resetMsg").textContent = "";
}

document.getElementById("resetBtn").addEventListener("click", function () {
    let email = document.getElementById("resetEmail").value.trim().toLowerCase();
    let newPass = document.getElementById("newPass").value.trim();

    let users = readUsers();
    let found = false;

    users = users.map(u => {
        if ((u.email || "").toLowerCase() === email) {
            found = true;
            return { ...u, password: newPass };
        }
        return u;
    });

    if (found) {
        saveUsers(users);
        document.getElementById("resetMsg").style.color = "green";
        document.getElementById("resetMsg").textContent = "Password updated!";
    } else {
        document.getElementById("resetMsg").style.color = "red";
        document.getElementById("resetMsg").textContent = "Email not found!";
    }
});

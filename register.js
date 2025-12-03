// register.js - Blue theme

function readUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(arr) {
    localStorage.setItem("users", JSON.stringify(arr));
}

document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const emailRaw = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPass").value;

    document.getElementById("regError").textContent = "";
    document.getElementById("regSuccess").textContent = "";

    if (!name) { document.getElementById("regError").textContent = "Please enter your name."; return; }
    if (!emailRaw) { document.getElementById("regError").textContent = "Please enter an email."; return; }
    if (!pass || pass.length < 6) { document.getElementById("regError").textContent = "Password must be at least 6 characters."; return; }

    const email = emailRaw.toLowerCase();

    const users = readUsers();
    const exists = users.some(u => (u.email || "").toLowerCase() === email);

    if (exists) {
        document.getElementById("regError").textContent = "Email already exists! Try signing in.";
        return;
    }

    users.push({
        name: name,
        email: email,
        password: pass,
        lastLogin: "Not logged in yet"
    });

    saveUsers(users);

    document.getElementById("regSuccess").textContent = "Registration successful! Redirecting to login...";
    setTimeout(() => {
        window.location.href = "login.html";
    }, 900);
});

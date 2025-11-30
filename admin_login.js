document.getElementById("adminForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let user = document.getElementById("adminUser").value.trim();
    let pass = document.getElementById("adminPass").value.trim();
    let error = document.getElementById("adminError");

    error.textContent = "";

    // Hardcoded admin login
    if (user === "admin" && pass === "Admin@123") {
        window.location.href = "admin_dashboard.html";
    } else {
        error.textContent = "Invalid admin credentials!";
    }
});

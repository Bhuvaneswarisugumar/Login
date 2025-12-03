// dashboard.js - Admin user management

function readUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(arr) {
    localStorage.setItem("users", JSON.stringify(arr));
}

let users = readUsers();

function loadUsers() {
    users = readUsers(); // always fresh
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    if (users.length === 0) {
        table.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:18px; color:#6b7a86">No users registered yet.</td></tr>`;
        return;
    }

    users.forEach((u, index) => {
        table.innerHTML += `
            <tr>
                <td>${escapeHtml(u.name || "")}</td>
                <td>${escapeHtml(u.email || "")}</td>
                <td>${escapeHtml(u.lastLogin || "Not logged in yet")}</td>
                <td>
                    <button class="del-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteUser(i) {
    if (!confirm("Delete this user permanently?")) return;
    users.splice(i, 1);
    saveUsers(users);
    loadUsers();
}

function addUser() {
    const name = document.getElementById("newName").value.trim();
    const emailRaw = document.getElementById("newEmail").value.trim();
    const pass = document.getElementById("newPass").value;

    if (!name || !emailRaw || !pass) {
        alert("Please fill name, email and password.");
        return;
    }

    const email = emailRaw.toLowerCase();
    users = readUsers();
    const exists = users.some(u => (u.email || "").toLowerCase() === email);
    if (exists) { alert("Email already exists."); return; }

    users.push({
        name: name,
        email: email,
        password: pass,
        lastLogin: "Not logged in yet"
    });

    saveUsers(users);
    document.getElementById("newName").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newPass").value = "";
    loadUsers();
}

function escapeHtml(unsafe) {
    return (unsafe + "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;");
}

loadUsers();

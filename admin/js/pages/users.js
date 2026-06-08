import { getUsers } from "../services/users.js";

export function renderUsers() {
  return `
    <main class="admin-users">
      <div class="page-header">
        <h1>Quản lý người dùng</h1>
      </div>

      <div id="users-container"></div>
    </main>
  `;
}

export async function initUsers() {
  const container = document.getElementById("users-container");

  if (!container) return;

  const data = await getUsers();
  const users = data.users || [];

  container.innerHTML = users.map(u => `
    <div class="user-item">
      <p>${u.name}</p>
      <p>${u.email}</p>
    </div>
  `).join("");
}
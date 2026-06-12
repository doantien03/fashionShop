import { getUsers } from "../services/users.js";

export function renderUsers() {
  return `
    <main class="admin-users">

      <div class="page-header">
        <h1>Quản lý người dùng</h1>
      </div>

      <div class="table-wrapper">

        <table class="users-table">

          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>

          <tbody id="users-container">
          </tbody>

        </table>

      </div>

    </main>
  `;
}

export async function initUsers() {

  const container =
    document.getElementById("users-container");

  if (!container) return;

  try {

    const data = await getUsers();

    const users = data.users || [];

    if (!users.length) {

      container.innerHTML = `
        <tr>
          <td colspan="5">
            Không có người dùng nào
          </td>
        </tr>
      `;

      return;
    }

    container.innerHTML = users.map(user => `
      <tr>

        <td>${user.name || "-"}</td>

        <td>${user.email || "-"}</td>

        <td>
          ${user.role || "user"}
        </td>

        <td>
          ${user.status || "active"}
        </td>

        <td>
          ${
            user.createdAt
              ? new Date(user.createdAt)
                  .toLocaleDateString("vi-VN")
              : "-"
          }
        </td>

      </tr>
    `).join("");

  } catch (error) {

    console.error(error);

    container.innerHTML = `
      <tr>
        <td colspan="5">
          Không thể tải dữ liệu
        </td>
      </tr>
    `;
  }

}
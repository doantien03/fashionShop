import { loginAPI } from "../services/auth.js";
import { saveToken, saveUser } from "../utils/storage.js";
import { showToast } from "../utils/toast.js";

export function renderLogin() {
  return `
    <main class="admin-login">

      <div class="login-box">

        <h1>Admin Login</h1>

        <div class="form-group">
          <label>Email</label>
          <input type="email" id="admin-email" placeholder="Enter admin email" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" id="admin-password" placeholder="Enter password" />
        </div>

        <button id="admin-login-btn">
          Đăng nhập
        </button>

        <p id="login-error" class="error-text"></p>

      </div>

    </main>
  `;
}

export function initLogin() {
  const btn = document.getElementById("admin-login-btn");
  const errorBox = document.getElementById("login-error");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = document
      .getElementById("admin-email")
      .value
      .trim();

    const password = document
      .getElementById("admin-password")
      .value;

    if (!email || !password) {
      errorBox.textContent = "Vui lòng nhập đầy đủ thông tin";
      return;
    }

    try {
      const { ok, data } = await loginAPI(email, password);

      if (ok && data.token) {

        // chỉ cho admin
        if (data.user?.role !== "admin") {
          errorBox.textContent = "Bạn không có quyền admin";
          return;
        }

        saveToken(data.token);
        saveUser(data.user);

        showToast("Đăng nhập thành công", "success");

        history.pushState({}, "", "/dashboard");
        window.renderRoute("/dashboard");

      } else {
        errorBox.textContent =
          data.message || "Đăng nhập thất bại";
      }

    } catch (err) {
      console.error(err);
      errorBox.textContent = "Lỗi server";
    }
  });
}
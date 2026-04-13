import { showToast } from "../utils/toast.js";
import { validateEmail, validatePassword } from "../utils/validator.js";

const API = "http://localhost:5000/api/auth";

export async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // validate
  if (!name || !email || !password) {
    showToast("Vui lòng nhập đầy đủ thông tin", "info");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Email không hợp lệ", "warning");
    return;
  }

  if (!validatePassword(password)) {
    showToast(
      "Mật khẩu phải ≥6 ký tự, có chữ hoa, chữ thường và số",
      "warning"
    );
    return;
  }

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      showToast("Đăng ký thành công", "success");

      // KHÔNG cần lưu token ở bước register (tuỳ backend)
      // chuyển sang login
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

    } else {
      showToast(data.message || "Đăng ký thất bại", "error");
    }

  } catch (err) {
    showToast("Lỗi kết nối server", "error");
  }
}
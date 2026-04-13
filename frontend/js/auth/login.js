import { showToast } from "../utils/toast.js";
import { validateEmail, validatePassword } from "../utils/validator.js";

const API = "http://localhost:5000/api/auth";

export async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // validate trước khi gọi API
  if (!email || !password) {
    showToast("Vui lòng nhập đầy đủ thông tin", "info");
    return;
  }

  // kiểm tra email
  if (!validateEmail(email)) {
    showToast("Email không hợp lệ", "warning");
    return;
  }

  // kiểm tra password
  if (!validatePassword(password)) {
    showToast(
      "Mật khẩu phải ≥6 ký tự, có chữ hoa, chữ thường và số",
      "warning"
    );
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
    //   showToast("Đăng nhập thành công", "success");

      // lưu token
      localStorage.setItem("token", data.token);

      // delay cho user thấy thông báo
      setTimeout(() => {
        window.location.href = "home.html";
      }, 500);

    } else {
      showToast(data.message || "Đăng nhập thất bại", "error");
    }

  } catch (err) {
    showToast("Lỗi kết nối server", "error");
  }
}
import { loginAPI } from "../services/auth.js";
import { showToast } from "../utils/toast.js";
import { validateEmail, validatePassword } from "../utils/validator.js";
import { saveToken } from "../utils/storage.js";

async function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // validate
  if (!email || !password) {
    showToast("Vui lòng nhập đầy đủ thông tin", "info");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Email không hợp lệ", "warning");
    return;
  }

  if (!validatePassword(password)) {
    showToast("Mật khẩu phải ≥6 ký tự, có chữ hoa, chữ thường và số", "warning");
    return;
  }

  if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    window.location.href = "register.html";
  });
  }

  // gọi service
  try {
    const { ok, data } = await loginAPI(email, password);

    if (ok && data.token) {
      saveToken(data.token);
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

// gắn event vào button
document.getElementById("signinleft").addEventListener("click", handleLogin);

//điều hướng khi click signup
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    window.location.href = "register.html";
  });
}

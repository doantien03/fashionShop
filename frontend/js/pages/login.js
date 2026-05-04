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

  // gọi service
  try {
    const { ok, data } = await loginAPI(email, password);

    if (ok && data.token) {
      saveToken(data.token);
      setTimeout(() => {
        history.pushState({}, "", "/home");
          window.renderRoute("/home");
      }, 1000);
    } else {
      showToast(data.message || "Đăng nhập thất bại", "error");
    }

  } catch (err) {
    showToast("Lỗi kết nối server", "error");
  }
}

export function initLogin() {
  const signupBtn = document.getElementById("signupBtn");

  // nút đăng nhập
  const signinBtn = document.getElementById("signinleft");
  if (signinBtn) {
    signinBtn.addEventListener("click", handleLogin);
  }

  // nút chuyển trang đăng ký
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      history.pushState({}, "", "/register");
      window.renderRoute("/register");
    });
  }
}
window.initLogin = initLogin;
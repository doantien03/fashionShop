import { registerAPI } from "../services/auth.js";
import { showToast } from "../utils/toast.js";
import { validateEmail, validatePassword } from "../utils/validator.js";

async function handleRegister() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
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
    showToast("Mật khẩu phải ≥6 ký tự, có chữ hoa, chữ thường và số", "warning");
    return;
  }

  // gọi service
  try {
    const { ok, data } = await registerAPI(name, email, password);

    if (ok) {
      showToast("Đăng ký thành công", "success");
      setTimeout(() => {
        history.pushState({}, "", "/login");
          window.renderRoute("/login");
      }, 1000);
    } else {
      showToast(data.message || "Đăng ký thất bại", "error");
    }

  } catch (err) {
    showToast("Lỗi kết nối server", "error");
  }
}

export function initRegister() {
  const signinBtn = document.getElementById("signinBtn");

  // nút đăng ký
  const signupBtn = document.getElementById("signupleft");
  if (signupBtn) {
    signupBtn.addEventListener("click", handleRegister);
  }

  // nút chuyển trang đăng nhập
  if (signinBtn) {
    signinBtn.addEventListener("click", () => {
      history.pushState({}, "", "/login");
      window.renderRoute("/login");
    });
  }
}
window.initRegister = initRegister;
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
        window.location.href = "login.html";
      }, 1500);
    } else {
      showToast(data.message || "Đăng ký thất bại", "error");
    }

  } catch (err) {
    showToast("Lỗi kết nối server", "error");
  }
}

document.getElementById("signupleft").addEventListener("click", handleRegister);

//điều hướng khi click signin
const signinBtn = document.getElementById("signinBtn");
if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}
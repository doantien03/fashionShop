import { login } from "./auth/login.js";
import { register } from "./auth/register.js";
import { headerComponent } from "../components/headerComponent.js";

document.addEventListener("DOMContentLoaded", () => {
  // render header
  const header = document.getElementById("header");
  if (header) {
    header.innerHTML = headerComponent();
  }

  // đăng nhập
  const loginBtn = document.getElementById("loginleft");
  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }

  // đăng ký
  const registerBtn = document.getElementById("registerleft");
  if (registerBtn) {
    registerBtn.addEventListener("click", register);
  }
});
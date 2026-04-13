// điều hướng signup (login-->register)
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    window.location.href = "register.html";
  });
}

// điều hướng signin (register-->login)
const signinBtn = document.getElementById("signinBtn");
if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}
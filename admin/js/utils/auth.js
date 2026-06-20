export function isLogin() {
  return localStorage.getItem("token") !== null;
}

export function isAdmin() {
  const user = getUser();
  return user && user.role === "admin";
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
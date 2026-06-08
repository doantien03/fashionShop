import { isLogin } from "../utils/auth.js";
import { routes } from "./routes.js";
import { setActiveMenu } from "../utils/setActive.js";

export function router() {
  const path = window.location.pathname;
  const app = document.getElementById("app");

  if (!isLogin()) {
    window.location.href = "/admin/login.html";
    return;
  }

  const page = routes[path];

  if (!page) {
    app.innerHTML = "<h2>404 Not Found</h2>";
    return;
  }

  // 1. render UI
  const needInit = page(app);

  // 2. đợi DOM update xong rồi mới chạy logic page
  requestAnimationFrame(() => {
    if (typeof needInit === "function") {
      needInit();
    }
    setActiveMenu();
  });
}
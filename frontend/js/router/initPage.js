import { handleCategory } from "./handleCategory.js";
import { initHome } from "../pages/home.js";

export function initPage(path) {
  if ( path === "/" || path === "/home") {
    initHome();
  }
  if (path === "/register") {
    window.initRegister?.();
  }
  if (path === "/login") {
    window.initLogin?.();
  }
  if (path.startsWith("/product/")) {
    window.initProductDetail?.(path);
  }
  // category
  if (path.startsWith("/ao") || path.startsWith("/quan") || path.startsWith("/phu-kien")) {
    handleCategory(path);
  }
}
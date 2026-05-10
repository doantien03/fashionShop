import { handleCategory } from "./handleCategory.js";
import { initHome } from "../pages/home.js";
import { initShirt } from "../pages/shirts.js";
import { initPants } from "../pages/pants.js";
import { initAccessory } from "../pages/accessory.js";

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
  if (path.startsWith("/ao")) {
    const options = handleCategory(path);
    initShirt(options);
  }
  if (path.startsWith("/quan")) {
    const options = handleCategory(path);
    initPants(options);
  }
  if (path.startsWith("/phu-kien")) {
    const options = handleCategory(path);
    initAccessory(options);
  }
}
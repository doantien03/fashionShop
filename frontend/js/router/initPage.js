import { handleCategory } from "./handleCategory.js";
import { initHome } from "../pages/home.js";
import { initShirt } from "../pages/shirts.js";
import { initPants } from "../pages/pants.js";
import { initAccessory } from "../pages/accessory.js";
import { initCartPage } from "../pages/cart.js";
import { initCheckout } from "../pages/checkout.js";
import { initNews } from "../pages/news.js";
import { initNewsDetail } from "../pages/news-detail.js";
import { initMyOrders } from "../pages/my-orders.js";
import { initOrderSuccess } from "../pages/order-success.js";
import { initOrderDetail } from "../pages/order-detail.js";

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
  if (path === "/cart") {
    initCartPage();
  }
  if (path === "/checkout") {
    initCheckout();
  }
  if(path === "/my-orders"){
    initMyOrders();
  }
  if(path.startsWith("/my-orders/")){
  initOrderDetail(path);
  }
  if(path === "/thong-tin"){
    initNews();
  }
  else if (path.startsWith("/thong-tin/")) {
  initNewsDetail(path);
  }
  if(path.startsWith("/order-success")){
  initOrderSuccess();
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
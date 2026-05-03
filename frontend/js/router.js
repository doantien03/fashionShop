import { loadPage } from "./utils/loadPage.js";
import { setActiveLink } from "./utils/setActiveLink.js";

export function initRouter() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");

    // chỉ xử lý link nội bộ
    if (!href || !href.startsWith("/")) return;

    e.preventDefault();

    history.pushState({}, "", href);
    renderRoute(href);
  });

  window.addEventListener("popstate", () => {
    renderRoute(window.location.pathname);
  });

  renderRoute(window.location.pathname);
}


async function renderRoute(path) {
  let page = "home";

  if (path === "/" || path === "/home") {
    page = "home";
  } 
  else if (path.startsWith("/ao")) {
    page = "shirts";
  } 
  else if (path === "/quan") {
    page = "pants";
  } 
  else if (path === "/phu-kien") {
    page = "accessory";
  }

  //  chờ load HTML
  await loadPage(page);

  setActiveLink(path);

  //  xử lý category + type
  handleCategory(path);
}

// ===============================

function handleCategory(path) {
  let category = null;
  let type = null;

  //  nhóm ÁO
  if (path === "/ao") {
    category = "ao";
  } 
  else if (path === "/ao/phong") {
    category = "ao";
    type = "ao-phong";
  } 
  else if (path === "/ao/polo") {
    category = "ao";
    type = "ao-polo";
  } 
  else if (path === "/ao/somi") {
    category = "ao";
    type = "ao-somi";
  }

  //  gọi sang shirts.js
  if (category) {
    window.renderPage?.({ category, type });
  }
}
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
  else if (path.startsWith("/quan")) {
    page = "pants";
  } 
  else if (path.startsWith("/phu-kien")) {
    page = "accessory";
  }
  else if (path.startsWith("/thong-tin")) {
    page = "info";
  }
  else if (path.startsWith("/product/")) {
    page = "product-detail";
  } 
  else if (path === "/login") {
    page = "login";
  } 
  else if (path === "/register") {
    page = "register";
  }

  await loadPage(page);
  setActiveLink(path);

  if (
  path.startsWith("/ao") ||
  path.startsWith("/quan") ||
  path.startsWith("/phu-kien")
  ) {
  handleCategory(path);
  }

  // register
  if (path === "/register") {
    window.initRegister?.();
  }

  // login
  if (path === "/login") {
    window.initLogin?.();
  }

  // product detail
  if (path.startsWith("/product/")) {
    window.initProductDetail?.(path);
  }
}

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

  // nhóm quần
  else if (path === "/quan") {
    category = "quan";
  } 
  else if (path === "/quan/short") {
    category = "quan";
    type = "quan-short";
  } 
  else if (path === "/quan/dai") {
    category = "quan";
    type = "quan-dai";
  }
  
  // phụ kiện
  else if (path === "/phu-kien") {
    category = "phu-kien";
  }
  else if (path === "/phu-kien/tui-balo") {
    category = "phu-kien";
    type = "tui-balo";
  }
  else if (path === "/phu-kien/giay-dep") {
    category = "phu-kien";
    type = "giay-dep";
  }
  else if (path === "/phu-kien/day-lung") {
    category = "phu-kien";
    type = "day-lung";
  }   

  //  gọi sang shirts.js
  if (path.startsWith("/ao")) {
  window.renderShirts?.({ category, type });
  }

  if (path.startsWith("/quan")) {
  window.renderPants?.({ category, type });
  }

  if (path.startsWith("/phu-kien")) {
  window.renderAccessory?.({ category, type });
}
}

window.renderRoute = renderRoute;
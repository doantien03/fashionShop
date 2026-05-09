import { loadPage } from "../utils/loadPage.js";
import { setActiveLink } from "../utils/setActiveLink.js";
import { routes } from "./routes.js";
import { initPage } from "./initPage.js";

export function initRouter() {
  document.addEventListener(
    "click",
    handleNavigation
  );
  window.addEventListener(
    "popstate",
    () => {
      renderRoute(
        window.location.pathname
      );
  });
  renderRoute(
    window.location.pathname
  );
}

function handleNavigation(e) {
  const link = e.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  
  if (!href || !href.startsWith("/")) return;
  e.preventDefault();
  history.pushState(
    {},
    "",href
  );
  renderRoute(href);
}

async function renderRoute(path) {
  let page = routes[path];
  // category pages
  if (path.startsWith("/ao")) {
    page = "shirts";
  }
  else if (path.startsWith("/quan")) {
    page = "pants";
  }
  else if (
    path.startsWith("/phu-kien")
  ) {
    page = "accessory";
  }
  else if (
    path.startsWith("/product/")
  ) {
    page = "product-detail";
  }
  // fallback
  if (!page) {
    page = "home";
  }
  await loadPage(page);
  setActiveLink(path);
  initPage(path);
}

window.renderRoute = renderRoute;
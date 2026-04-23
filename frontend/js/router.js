import { loadPage } from "./utils/loadPage.js";
import { setActiveLink } from "./utils/setActiveLink.js";

export function initRouter() {
  // click nav
  document.addEventListener("click", (e) => {
    const link = e.target.closest(".nav-link");

    if (link) {
      e.preventDefault();
      const path = link.getAttribute("href");

      navigate(path);
    }
  });

  // back / forward
  window.addEventListener("popstate", () => {
    renderRoute(window.location.pathname);
  });

  // load lần đầu
  renderRoute(window.location.pathname);
}

function navigate(path) {
  history.pushState({}, "", path);
  renderRoute(path);
}

function renderRoute(path) {
  let page = "home";

  if (path === "/" || path === "/home") page = "home";
  else if (path === "/ao") page = "tops";
  else if (path === "/quan") page = "bottoms";
  else if (path === "/phu-kien") page = "accessories";

  loadPage(page);
  setActiveLink(path);
}
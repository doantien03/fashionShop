import { router } from "./router/router.js";

function navigate(url) {
  window.history.pushState({}, "", url);
  router();
}

// chặn click link SPA
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;

  e.preventDefault();
  navigate(link.getAttribute("href"));
});

// back/forward browser
window.addEventListener("popstate", router);

// chạy lần đầu
router();
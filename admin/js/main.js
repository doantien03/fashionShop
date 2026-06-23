import { router } from "./router/router.js";

let isRouting = false;

function navigate(url) {
  window.history.pushState({}, "", url);
  runRouter();
}

// chặn click SPA
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;

  e.preventDefault();
  navigate(link.getAttribute("href"));
});

// back/forward
window.addEventListener("popstate", runRouter);

// wrapper chống spam
async function runRouter() {
  if (isRouting) return;
  isRouting = true;

  try {
    await router();
  } finally {
    isRouting = false;
  }
}

// init
runRouter();
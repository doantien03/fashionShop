import { router } from "./router/router.js";

let isRouting = false;

function navigate(url) {
  window.history.pushState({}, "", url);
  run();
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;

  e.preventDefault();
  navigate(link.getAttribute("href"));
});

window.addEventListener("popstate", run);

async function run() {
  if (isRouting) return;
  isRouting = true;

  try {
    await router();
  } finally {
    isRouting = false;
  }
}

run();
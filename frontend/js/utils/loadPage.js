export async function loadPage(page) {
  const res = await fetch(`/pages/${page}.html`);
  const html = await res.text();

  const app = document.getElementById("app");

  // xóa DOM + state cũ
  app.innerHTML = "";

  window.__eventsBound = false;

  app.innerHTML = html;

  const module = await import(`/js/pages/${page}.js`);
  module.init?.();
}
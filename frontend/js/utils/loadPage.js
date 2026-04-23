export async function loadPage(page) {
  const res = await fetch(`/pages/${page}.html`);
  const html = await res.text();

  document.getElementById("app").innerHTML = html;

  if (page === "home") {
    const module = await import("/js/pages/home.js");
    module.init();
  }
}
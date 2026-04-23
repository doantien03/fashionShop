export function setActiveLink(path) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });
}
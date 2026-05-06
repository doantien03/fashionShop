export function setActiveLink(path) {
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");

    link.classList.remove("active");

    if (
      path === href || 
      (href !== "/home" && path.startsWith(href))
    ) {
      link.classList.add("active");
    }
  });
}
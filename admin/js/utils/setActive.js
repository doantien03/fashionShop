export function setActiveMenu() {
  const links = document.querySelectorAll("a[data-link]");
  const path = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
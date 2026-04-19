export function renderHeader() {
  const header = document.getElementById("header");
  
  if (!header) return; 

  header.innerHTML = `
    <header class="header">
      <div class="logo">FASHION</div>

      <nav>
        <a href="../pages/home.html" class="nav-link">TRANG CHỦ</a>                
        <a href="/ao" class="nav-link">ÁO</a>
        <a href="/quan" class="nav-link">QUẦN</a>
        <a href="/phu-kien" class="nav-link">PHỤ KIỆN</a>
        <a href="/thong-tin" class="nav-link">THÔNG TIN</a>
      </nav>

      <div class="icons">
        <img src="../assets/icons/search.svg" />
        <img src="../assets/icons/user.svg" />
        <img src="../assets/icons/cart.svg" />
      </div>
    </header>
  `;

  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}
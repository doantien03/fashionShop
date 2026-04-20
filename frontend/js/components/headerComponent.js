export function renderHeader() {
  const header = document.getElementById("header");
  
  if (!header) return; 

  header.innerHTML = `
    <header class="header">
      <div class="logo">FASHION</div>

      <nav>
        <a href="../pages/home.html" class="nav-link">TRANG CHỦ</a>
        
        <div class="nav-item">
        <a href="/ao" class="nav-link">ÁO</a>
        <div class="dropdown">
            <a href="/ao/phong">Áo Phông</a>
            <a href="/ao/polo">Áo Polo</a>
            <a href="/ao/somi">Áo Sơ Mi</a>
        </div></div>
        
        <div class="nav-item">
        <a href="/quan" class="nav-link">QUẦN</a>
        <div class="dropdown">
            <a href="/quan/dai">Quần dài</a>
            <a href="/quan/short">Quần short</a>
        </div></div>
        
        <div class="nav-item">
        <a href="/phu-kien" class="nav-link">PHỤ KIỆN</a>
        <div class="dropdown">
            <a href="/phu-kien/tui-balo">Túi/Balo</a>
            <a href="/phu-kien/giay-dep">Giày dép</a>
            <a href="/phu-kien/day-lung">Dây lưng</a>
          </div>
        </div>
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
import { getUser, removeUser, removeToken } from "../utils/storage.js";

let isScroll = false;

export function renderHeader() {
  const header = document.getElementById("header");
  if (!header) return; 
  
  // lấy thông tin user đã login
  const user = getUser();
  
  header.innerHTML = ` 
    <header class="header">

      <div class="top-bar">
        <div class="phone">
          <img src="../assets/icons/phone.svg" class="icon-top" />
          0869.865.313
        </div>

        <div class="right">
        
          ${
            user
              ? `
              <a href="/my-orders" class="account-link">
                <img src="../assets/icons/user.svg" class="icon-top" />
                ${user.name}
              </a>

              <a href="#" id="logout-btn" class="account-link">
                <img src="../assets/icons/user.svg" class="icon-top" />
                Đăng xuất
              </a>
            `
              : `
              <a href="/login" class="account-link">
                <img src="../assets/icons/user.svg" class="icon-top" />
                Tài khoản
              </a>
            `
          }
          <a href="/cart" class="account-link">
            <img src="../assets/icons/cart.svg" class="icon-top" />
            Giỏ hàng (<span id="cart-count">0</span>)
          </a>
        </div>
      </div>
      
      <div class="header-main">
        <div class="logo">FASHION</div>

        <nav>
          <a href="/home" class="nav-link">TRANG CHỦ</a>
          
          <div class="nav-item">
            <a href="/ao" class="nav-link">ÁO</a>
            <div class="dropdown">
              <a href="/ao/phong">Áo Phông</a>
              <a href="/ao/polo">Áo Polo</a>
              <a href="/ao/somi">Áo Sơ Mi</a>
            </div>
          </div>
          
          <div class="nav-item">
            <a href="/quan" class="nav-link">QUẦN</a>
            <div class="dropdown">
              <a href="/quan/dai">Quần dài</a>
              <a href="/quan/short">Quần short</a>
            </div>
          </div>
          
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

        <div class="search-box">
          <input type="text" placeholder="Tìm kiếm..." />
          <img src="../assets/icons/search.svg" class="icons" />
        </div>
      </div>

    </header>
  `;

  // xử lý logout
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeUser();
      removeToken();
      renderHeader();
      
      history.pushState({}, "", "/home");
      window.renderRoute("/home");
    });
  }

  if (!isScroll) {
    const headerEl = document.querySelector(".header");

    window.addEventListener("scroll", () => {
      if (!headerEl) return;

      if (window.scrollY > 50) {
        headerEl.classList.add("scrolled");
      } else {
        headerEl.classList.remove("scrolled");
      }
    });

    isScroll = true;
  }
}
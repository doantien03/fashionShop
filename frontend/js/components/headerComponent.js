export function renderHeader() {
  const header = document.getElementById("header");
  
  if (!header) return; 

  header.innerHTML = ` 
    <header class="header">

      <div class="top-bar">
         <div class="phone">
             <img src="../assets/icons/phone.svg" class="icon-top" />
             086986.5313
         </div>

         <div class="right">
             <a href="/register" class="account-link">
                <img src="../assets/icons/user.svg" class="icon-top" />
                Tài khoản
             </a>

             <span class="cart">
                <img src="../assets/icons/cart.svg" class="icon-top" />
                Giỏ hàng (<span id="cart-count">0</span>)
             </span>
         </div>
      </div>
      
      <div class="header-main">
      <div class="logo">FASHION</div>
        <nav>
        <a href="/home" class="nav-link">TRANG CHỦ</a>
        
        <div class="nav-item">
        <a href="/ao" class="nav-link">ÁO</a>
        <div class="dropdown">
            <a href="/ao/phong" data-category="ao" data-type="ao-phong">Áo Phông</a>
            <a href="/ao/polo" data-category="ao" data-type="ao-polo">Áo Polo</a>
            <a href="/ao/somi" data-category="ao" data-type="ao-somi">Áo Sơ Mi</a>
        </div></div>
        
        <div class="nav-item">
        <a href="/quan" class="nav-link">QUẦN</a>
        <div class="dropdown">
            <a href="/quan/dai" data-category="quan" data-type="quan-dai">Quần dài</a>
            <a href="/quan/short" data-category="quan" data-type="quan-short">Quần short</a>
        </div></div>
        
        <div class="nav-item">
        <a href="/phu-kien" class="nav-link">PHỤ KIỆN</a>
        <div class="dropdown">
            <a href="/phu-kien/tui-balo" data-category="phu-kien" data-type="tui-balo">Túi/Balo</a>
            <a href="/phu-kien/giay-dep" data-category="phu-kien" data-type="giay-dep">Giày dép</a>
            <a href="/phu-kien/day-lung" data-category="phu-kien" data-type="day-lung">Dây lưng</a>
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

  const currentPath = window.location.pathname; 
  document.querySelectorAll(".nav-link").forEach(link => { 
    if (link.getAttribute("href") === currentPath) 
      { link.classList.add("active"); } 
  });
}

  
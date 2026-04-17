export function renderHeader() {
  const header = document.getElementById("header");
  
  if (!header) return; 

  header.innerHTML = `
    <header class="header">
      <div class="logo">FASHION</div>

      <nav>
        <a href="/">TRANG CHỦ</a>                
        <a href="/ao">ÁO</a>
        <a href="/quan">QUẦN</a>
        <a href="/phu-kien">PHỤ KIỆN</a>
        <a href="/thong-tin">THÔNG TIN</a>
      </nav>

      <div class="icons">
        <img src="../assets/icons/search.svg" />
        <img src="../assets/icons/user.svg" />
        <img src="../assets/icons/cart.svg" />
      </div>
    </header>
  `;
}
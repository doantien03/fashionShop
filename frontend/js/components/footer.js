export function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.outerHTML = `
    <footer class="footer">
      <div class="footer-left">
        <div class="logo">Fashion<span>.</span></div>
        <p>Số điện thoại: 0869.865.313</p>
        <p>Email: doantienle@gmail.com.vn</p>
        <p>Địa chỉ: Số 55 Giải Phóng - phường Bạch Mai - TP.Hà Nội</p>
      </div>

      <div class="footer-center">
        <h4>COMPANY</h4>
        <a href="/home">Trang chủ</a>                
        <a href="/ao">Áo</a>
        <a href="/quan">Quần</a>
        <a href="/phu-kien">Phụ kiện</a>
        <a href="/thong-tin">Thông tin</a>
      </div>

      <div class="footer-right">
        <h4>HỖ TRỢ KHÁCH HÀNG</h4>
        <p>Hướng dẫn mua hàng</p>
        <p>Hướng dẫn chọn size</p>
        <p>Phương thức thanh toán</p>
        <p>Chính sách vận chuyển</p>
        <p>Chính sách bảo mật</p>
      </div>
    </footer>
  `;
}
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
        <p>FB: https://wwww.facebook.com/VN</p>
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
        <a href="/thong-tin/thuong-hieu">Sứ mệnh - thương hiệu Fashion</a>
        <a href="/thong-tin/he-thong-cua-hang">Hệ thống cửa hàng</a>
        <a href="/thong-tin/chinh-sach-bao-mat">Chính sách bảo mật thông tin</a>
        <a href="/thong-tin/huong-dan-mua-hang">Hướng dẫn mua hàng</a>
        <a href="/thong-tin/chinh-sach-doi-hang">Chính sách đổi hàng</a>
        <a href="/thong-tin/chinh-sach-van-chuyen">Chính sách vận chuyển</a>
      </div>
    </footer>
  `;
}
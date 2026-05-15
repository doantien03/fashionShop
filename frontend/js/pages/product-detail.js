import { getProducts } from "../services/product.js";
import { addToCart, renderCart, openCart} from "../modules/cart.js";

let currentProduct = null;
let selectedColor = "";

export async function initProductDetail(path) {
  const id = path.split("/product/")[1];

  try {
    const res = await getProducts();

    if (!res.ok) {
      document.body.innerHTML = "<h2>Lỗi tải sản phẩm</h2>";
      return;
    }
    currentProduct = res.data.products.find(p => p._id === id);

    if (!currentProduct) {
      document.body.innerHTML = "<h2>Không tìm thấy sản phẩm</h2>";
      return;
    }

    renderProduct();
    bindEvents();

  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<h2>Lỗi server</h2>";
  }
}

window.initProductDetail = initProductDetail;

function renderProduct() {
  document.getElementById("name").innerText = currentProduct.name;

  document.getElementById("price").innerText =
    currentProduct.price.toLocaleString("vi-VN") + "đ";

  document.getElementById("main-img").src =
    currentProduct.thumbnail;

  // thumbnails theo hàng dọc
  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = currentProduct.colors.map(c => `
    <img src="${c.image}" 
    data-image="${c.image}" />
  `).join("");

  // render các nút màu bên phải
  const colors = document.getElementById("colors");
  const colorNameEl = document.getElementById("select-color");

  colors.innerHTML = currentProduct.colors.map(c => `
    <span 
       class="color-item"
       style="background:${c.code}"
       data-image="${c.image}"
       data-name="${c.name}"       
    ></span>
      `).join("");

  // mặc định hiện màu đầu tiên
  if (currentProduct.colors.length > 0) {
     colorNameEl.textContent = currentProduct.colors[0].name;
  }

  // chọn màu sản phẩm 
  document.querySelectorAll(".color-item").forEach(item => {
     item.addEventListener("click", () => {

      selectedColor = item.dataset.name;

     // hiện tên màu 
     colorNameEl.textContent = item.dataset.name;

     // đổi ảnh
     const newImage = item.dataset.image;
     document.getElementById("main-image").src = newImage;
    });
   });
}

function bindEvents() {

  // đổi ảnh (colors)
  document.getElementById("colors").onclick = (e) => {
    const color = e.target.closest(".color-item");
    if (!color) return;

    document.getElementById("main-img").src =
      color.dataset.image;
  };

  // đổi ảnh thumbnail
  document.getElementById("thumbs").onclick = (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    document.getElementById("main-img").src =
      img.dataset.image;
  };

  // chọn size
  document.querySelectorAll(".sizes span").forEach(size => {
    size.onclick = () => {
      document.querySelectorAll(".sizes span")
        .forEach(s => s.classList.remove("active"));
      size.classList.add("active");
    };
  });

  // chọn số lượng
  const qty = document.getElementById("qty");

  document.getElementById("plus").onclick = () => {
    qty.value = Number(qty.value) + 1;
  };

  document.getElementById("minus").onclick = () => {
    if (qty.value > 1) {
      qty.value = Number(qty.value) - 1;
    }
  };

  //lấy thông tin thêm vào giỏ hàng
  document.getElementById("add-cart")
  .onclick = () => {

    const activeSize = document.querySelector(".sizes span.active");

    if (!activeSize) {
      alert("Vui lòng chọn size");
      return;
    }

    const quantity =
      Number(document.getElementById("qty").value);

    const mainImg =
      document.getElementById("main-img").src;

    const product = {

      _id: currentProduct._id,

      name: currentProduct.name,

      price: currentProduct.price,

      image: mainImg,

      size: activeSize.innerText,

      quantity,

      color: selectedColor || "",

    };

    addToCart(product);

    renderCart();

    openCart();

  };

  // mua ngay
  document.querySelector(".buy-now").onclick = () => {
    console.log(" Mua ngay:", currentProduct._id);
  };
}
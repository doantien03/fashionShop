import { getProducts } from "../services/product.js";
import { addToCart, renderCart, openCart} from "../modules/cart.js";
import { isAdmin } from "../utils/storage.js";

let currentProduct = null;
let selectedColor = "";
let currentIndex = 0;

if(isAdmin()){
    document.getElementById("add-cart-btn")?.remove();
    document.getElementById("buy-now-btn")?.remove();
}

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
    updateImage(0);
    bindEvents();

  } 
  catch (err) {
    console.error(err);
    document.body.innerHTML = "<h2>Lỗi server</h2>";
  }
}
window.initProductDetail = initProductDetail;

function renderProduct() {
  document.getElementById("name").innerText = currentProduct.name; // tên sp
  document.getElementById("price").innerText = currentProduct.price.toLocaleString("vi-VN") + "đ"; // giá sp
  document.getElementById("description").innerText = currentProduct.description || "";
  document.getElementById("main-image").src = currentProduct.thumbnail; // ảnh

  // thumbnails theo hàng dọc
  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = currentProduct.colors.map((c,index)=>`
    <img
      src="${c.image}"
      class="thumb-item ${index === 0 ? "active" : ""}"
      data-index="${index}"
    />
  `).join("");

  // render các nút màu bên phải
  const colors = document.getElementById("colors");
  const colorNameEl = document.getElementById("select-color");

  colors.innerHTML = currentProduct.colors.map((c,index)=>`
    <div
      class="color-item ${index === 0 ? "active" : ""}"
      data-index="${index}"
    >
      <img
        src="${c.image}"
        alt="${c.name}"
      >
    </div>
  `).join("");

  // mặc định hiện màu đầu tiên
  if (currentProduct.colors.length > 0) {
     updateImage(0);
  }

  // render size
  const sizeWrapper = document.getElementById("size-wrapper");
  const sizeBox = document.querySelector(".sizes");

  if (currentProduct.sizes && currentProduct.sizes.length > 0) {
    sizeWrapper.style.display = "block";
    sizeBox.innerHTML = currentProduct.sizes.map((size)=>`
        <span>${size}</span>
    `).join("");
  } else {

    sizeWrapper.style.display = "none";

}
}


function bindEvents() {

  // chọn màu
  document.getElementById("colors").onclick = (e) => {
  const color = e.target.closest(".color-item");
  if (!color) return;
  updateImage(
    Number(color.dataset.index)
    );
  };

  // đổi ảnh thumbnail
  document.getElementById("thumbs").onclick = (e) => {
  const img = e.target.closest(".thumb-item");
  if (!img) return;
  updateImage(
    Number(img.dataset.index)
    );
  };
  
  // nút next
  document.getElementById("nextImg").onclick = () => {
  let next = currentIndex + 1;
  if ( next >= currentProduct.colors.length) {
    next = 0;
    }
  updateImage(next);
  };
  
  // nút prev
  document.getElementById("prevImg").onclick = () => {
  let prev = currentIndex - 1;
  if (prev < 0) { prev = currentProduct.colors.length - 1;
    }
  updateImage(prev);
  };

  // chọn size
  const sizes = document.querySelectorAll(".sizes span");
  sizes.forEach(size => {
    size.onclick = () => {
      sizes.forEach(s=>{
            s.classList.remove("active");
        });
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
  document.getElementById("add-cart").onclick = () => {
  const hasSize = currentProduct.sizes && currentProduct.sizes.length > 0;
  const activeSize = document.querySelector(".sizes span.active");
  if (!selectedColor) {
    showMessage("Vui lòng chọn màu sắc");
    return;
  }
  if (hasSize && !activeSize) {
    showMessage("Vui lòng chọn kích cỡ");
    return;
  }

    const quantity = Number(document.getElementById("qty").value);
    const mainImg = document.getElementById("main-image").src;
    const product = {

      _id: currentProduct._id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: mainImg,
      size: hasSize ? activeSize.innerText : "",
      quantity,
      color: selectedColor || "",
    };

    addToCart(product);
    renderCart();
    openCart();
  };

  // mua ngay
  document.querySelector(".buy-now").onclick = async () => {
  const buyBtn = document.querySelector(".buy-now");

  // đang xử lý thì không cho bấm tiếp
  if (buyBtn.disabled) return;
  const hasSize = currentProduct.sizes && currentProduct.sizes.length > 0;
  const activeSize = document.querySelector(".sizes span.active");
  if (!selectedColor) {
    showMessage("Vui lòng chọn màu sắc");
    return;
  }
  if (hasSize && !activeSize) {
    showMessage("Vui lòng chọn kích cỡ");
    return;
  }
  try {
    // khóa nút
    buyBtn.disabled = true;
    buyBtn.innerText = "Đang xử lý...";
    const quantity = Number(document.getElementById("qty").value);
    const product = {
      _id: currentProduct._id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: document.getElementById("main-image").src,
      size: hasSize ? activeSize.innerText : "",
      quantity,
      color: selectedColor
    };
    await addToCart(product);
    history.pushState({},"","/checkout");
    window.renderRoute("/checkout");
  }
  catch(error){
    console.log(error);
    showMessage("Có lỗi xảy ra");
  }
  finally{
    buyBtn.disabled = false;
    buyBtn.innerText = "MUA NGAY";
  }
};
}

// hàm thông báo khi chọn thiếu color or size
function showMessage(text){
  const msg = document.getElementById("product-message");
  msg.innerText = text;
  msg.classList.add("show");

  setTimeout(()=>{
    msg.classList.remove(
      "show"
    );
    msg.innerText = "";
  },3000);
}

// cập nhật ảnh
function updateImage(index) {
  currentIndex = index;
  const selected = currentProduct.colors[index];
  if (!selected) return;

  document.getElementById("main-image").src = selected.image;
  selectedColor = selected.name;
  document.getElementById("select-color").textContent =selected.name;
  document.querySelectorAll(".thumb-item")
    .forEach((item, i) => {
      item.classList.toggle(
        "active",
        i === index
      );
    });

  document.querySelectorAll(".color-item")
    .forEach((item, i) => {
      item.classList.toggle(
        "active",
        i === index
      );
    });
}
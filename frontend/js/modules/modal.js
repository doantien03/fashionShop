import { getProducts } from "../services/product.js";
import { addToCart, renderCart, openCart } from "../modules/cart.js";

let currentProduct = null;
let selectedColor = "";
let currentIndex = 0;

// thông báo
function showMessage(text) {
  const msg = document.getElementById("product-message");
  msg.innerText = text;
  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
    msg.innerText = "";
  }, 3000);
}

// mở modal
export async function openModal(id) {
  const res = await getProducts();
  currentProduct = res.data.products.find(
    p => p._id === id
  );
  if (!currentProduct) return;
  document.getElementById("productModal").classList.add("active");
  document.body.classList.add("no-scroll");

  renderModal();
}

// render trang
function renderModal() {
  const modalName = document.getElementById("modal-name");
  const modalPrice = document.getElementById("modal-price");
  const mainImg = document.getElementById("modal-main-img");
  const thumbs = document.getElementById("modal-thumbs");
  const colors = document.getElementById("modal-colors");
  const qty = document.getElementById("modal-qty");

  modalName.innerText = currentProduct.name;
  modalPrice.innerText = currentProduct.price.toLocaleString("vi-VN") + "đ";

  selectedColor = "";
  currentIndex = 0;
  qty.value = 1;

  renderSizes();
  renderImages(mainImg, thumbs, colors);
  bindEvents(mainImg, qty);

  document.getElementById("view-detail").onclick = (e) => {
    e.preventDefault();
    closeModal();
    history.pushState({},"",`/product/${currentProduct._id}`);
    window.renderRoute(`/product/${currentProduct._id}`);

  };
}

// render kích thước
function renderSizes() {
  const sizesBox = document.querySelector(".sizes");
  const title = sizesBox.previousElementSibling;
  if ( currentProduct.sizes && currentProduct.sizes.length > 0) {
    title.style.display = "";
    sizesBox.style.display = "flex";
    sizesBox.innerHTML = currentProduct.sizes.map(size =>
        `<span>${size}</span>`
      ).join("");
  }
  else {
    title.style.display = "none";
    sizesBox.style.display = "none";
    sizesBox.innerHTML = "";
  }
}

function renderImages(mainImg, thumbs, colors) {
  mainImg.src = currentProduct.thumbnail;
  thumbs.innerHTML = currentProduct.colors.map((c, index) => `
      <img
        src="${c.image}"
        class="thumb-item ${index === 0 ? "active" : ""}"
      />
  `).join("");

  colors.innerHTML = currentProduct.colors.map((c, index) => `
      <span class="color-item ${index===0?"active":""}">
          <img
             src="${c.image}"
             alt="${c.name}"
          >
      </span>
  `).join("");

  updateImage(mainImg,0);
}

function updateImage(mainImg, index) {
  currentIndex = index;
  const selected = currentProduct.colors[index];
  if (!selected) return;

  mainImg.src = selected.image;
  selectedColor = selected.name;

  document.getElementById("select-color").textContent = selected.name;

  document.querySelectorAll(".thumb-item")
    .forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });

  document.querySelectorAll("#modal-colors .color-item")
    .forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
}

function getSelectedProduct(mainImg, qty) {
  const hasSize = currentProduct.sizes && currentProduct.sizes.length > 0;
  const activeSize = document.querySelector(".sizes span.active");

  if (!selectedColor) {
    showMessage("Vui lòng chọn màu sắc");
    return null;
  }

  if (hasSize && !activeSize) {
    showMessage("Vui lòng chọn kích thước");
    return null;
  }

  return {
    _id: currentProduct._id,
    name: currentProduct.name,
    price: currentProduct.price,
    image: mainImg.src,
    color: selectedColor,
    size: hasSize ? activeSize.innerText : "",
    quantity: Number(qty.value)
  };
}

function bindEvents(mainImg, qty) {
  // thumbnail
  document.getElementById("modal-thumbs").onclick = (e) => {
    const img = e.target.closest(".thumb-item");
    if (!img) return;

    const index = Array.from(img.parentElement.children).indexOf(img);
    updateImage(mainImg, index);
  };

  // color
  document.getElementById("modal-colors").onclick = (e) => {
    const color = e.target.closest(".color-item");
    if (!color) return;
    const index = Array.from(color.parentElement.children).indexOf(color);
    updateImage(mainImg, index);
  };

  // next
  document.getElementById("nextImg").onclick = () => {
    let next = currentIndex + 1;
    if (next >= currentProduct.colors.length)
      next = 0;
    updateImage(mainImg, next);
  };

  // prev
  document.getElementById("prevImg").onclick = () => {
    let prev = currentIndex - 1;
    if (prev < 0)
      prev = currentProduct.colors.length - 1;
    updateImage(mainImg, prev);
  };

  // size
  document.querySelectorAll(".sizes span")
    .forEach(span => {
      span.onclick = () => {
        document.querySelectorAll(".sizes span").forEach(s => s.classList.remove("active"));
        span.classList.add("active");
      };
    });

  // quantity
  document.getElementById("modal-plus").onclick = () => {
    qty.value = Number(qty.value) + 1;
  };
  document.getElementById("modal-minus").onclick = () => {
    if (qty.value > 1)
      qty.value = Number(qty.value) - 1;
  };

  // add cart
  document.getElementById("modal-add-cart").onclick = () => {
    const product = getSelectedProduct(mainImg, qty);
    if (!product) return;
    addToCart(product);
    renderCart();
    openCart();
    closeModal();
  };
}


export function initModal() {
  document.getElementById("closeModal")
    .onclick = closeModal;
  document.querySelector(".modal-overlay")
    .onclick = closeModal;
}

// đóng madal
function closeModal() {
  document.getElementById("productModal")
    .classList.remove("active");
  document.body.classList.remove("no-scroll");
}
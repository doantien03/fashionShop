import { getProducts } from "../services/product.js";

let currentProduct = null;

// ================= OPEN MODAL =================
export async function openModal(id) {

  const res = await getProducts();

  currentProduct = res.data.products.find(
    p => p._id === id
  );

  if (!currentProduct) return;

  const modal =
    document.getElementById("productModal");

  modal.classList.add("active");

  // khóa scroll nền
  document.body.classList.add("no-scroll");

  renderModal();
}

// ================= RENDER =================
function renderModal() {

  // ===== ELEMENTS =====
  const modalName =
    document.getElementById("modal-name");

  const modalPrice =
    document.getElementById("modal-price");

  const mainImg =
    document.getElementById("modal-main-img");

  const thumbs =
    document.getElementById("modal-thumbs");

  const colors =
    document.getElementById("modal-colors");

  // ===== INFO =====
  modalName.innerText =
    currentProduct.name;

  modalPrice.innerText =
    currentProduct.price.toLocaleString("vi-VN") + "đ";

  // ===== MAIN IMAGE =====
  mainImg.src =
    currentProduct.thumbnail;

  // ===== THUMBNAILS =====
  thumbs.innerHTML =
    currentProduct.colors.map((c, index) => `
      <img
        src="${c.image}"
        data-image="${c.image}"
        class="thumb-item ${index === 0 ? "active" : ""}"
      />
    `).join("");

  // click thumbnail
  thumbs.onclick = (e) => {

    const img =
      e.target.closest(".thumb-item");

    if (!img) return;

    // đổi ảnh
    mainImg.src =
      img.dataset.image;

    // active
    document.querySelectorAll(".thumb-item")
      .forEach(t =>
        t.classList.remove("active")
      );

    img.classList.add("active");
  };

  // ===== COLORS =====
  colors.innerHTML =
    currentProduct.colors.map(c => `
      <span
        class="color-item"
        style="background:${c.code}"
        data-image="${c.image}">
      </span>
    `).join("");

  // click color
  colors.onclick = (e) => {

    const color =
      e.target.closest(".color-item");

    if (!color) return;

    mainImg.src =
      color.dataset.image;
  };
}

// ================= INIT =================
export function initModal() {

  document.getElementById("closeModal")
    .onclick = closeModal;

  document.querySelector(".modal-overlay")
    .onclick = closeModal;
}

// ================= CLOSE =================
function closeModal() {

  document.getElementById("productModal")
    .classList.remove("active");

  document.body.classList.remove("no-scroll");
}
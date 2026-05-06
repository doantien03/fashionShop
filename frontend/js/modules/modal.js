import { getProducts } from "../services/product.js";

let currentProduct = null;

export async function openModal(id) {
  const res = await getProducts();
  currentProduct = res.data.products.find(p => p._id === id);

  if (!currentProduct) return;

  const modal = document.getElementById("productModal");
  modal.classList.add("active");

  // khóa scroll + interaction phía sau
  document.body.classList.add("no-scroll");

  renderModal();
}

function renderModal() {
  document.getElementById("modal-name").innerText =
    currentProduct.name;

  document.getElementById("modal-price").innerText =
    currentProduct.price.toLocaleString("vi-VN") + "đ";

  document.getElementById("modal-main-img").src =
    currentProduct.thumbnail;
}

// đóng modal
export function initModal() {
  document.getElementById("closeModal").onclick = closeModal;
  document.querySelector(".modal-overlay").onclick = closeModal;
}

function closeModal() {
  document.getElementById("productModal")
    .classList.remove("active");

  //  mở lại scroll
  document.body.classList.remove("no-scroll");
}
import { openModal } from "../modules/modal.js";

let isBound = false;

// Click chuyển màu
export function handleColorClick(e) {
  const color = e.target.closest(".color-item");
  if (!color) return;
  e.stopPropagation(); 

  const product = color.closest(".product");
  if (!product) {
    console.log("Không tìm thấy product");
    return;
  }
  const id = product.dataset.id;
  const newImage = color.dataset.image;
  const img = document.getElementById(`img-${id}`);
  if (img){ 
    img.src = newImage;
  }
  product.querySelectorAll(".color-item").forEach(c => c.classList.remove("active"));
  color.classList.add("active");
}

// Click vào thẻ sản phẩm 
export function handleCardClick(card) {
  const id = card.dataset.id;
  history.pushState({}, "", `/product/${id}`);
  window.renderRoute(`/product/${id}`);
}

// chọn vùng sự kiện thẻ khi click
export function bindEvents() {
  if (isBound) return;
  isBound = true;
  const container = document.getElementById("app");

  container.addEventListener("click", (e) => {
    const color = e.target.closest(".color-item");
    if (color) {
      handleColorClick(e);
      return;
    }

    // click "Mua nhanh"
    const buyBtn = e.target.closest(".btn-buy");
    if (buyBtn) {
      e.stopPropagation();
      const product = buyBtn.closest(".product");
      const id = product.dataset.id;

      openModal(id);
      return;
    }
  
    // click "Xem chi tiết"
    const detailBtn = e.target.closest(".btn-detail");
    if (detailBtn) {
      e.stopPropagation();

      const product = detailBtn.closest(".product");
      handleCardClick(product);
      return;
    }

    // click cả card
    const productImg = e.target.closest(".product-img");
    if (productImg) {
       const product = productImg.closest(".product");
       handleCardClick(product);
      }
    });
  }
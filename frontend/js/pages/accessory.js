import { getProducts } from "../services/product.js";
import { openModal } from "../modules/modal.js";
import { bindEvents } from "../components/productEvents.js";

function renderProducts(products, elementId) {
  const container = document.getElementById(elementId);

  if (!products.length) {
    container.innerHTML = `<p>Không có sản phẩm nào</p>`;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product" data-id="${p._id}">
      
      <div class="product-img">
        <img 
          id="img-${p._id}" 
          src="${p.thumbnail}" 
          alt="${p.name}" 
          loading="lazy"
        />
        <div class="overlay">
          <button class="btn-buy">
          <img src="../assets/icons/cart.svg" class="icon" />
          Mua nhanh
          </button>
          
          <div class="divider"></div>

          <button class="btn-detail">
          <img src="../assets/icons/eye.svg" class="icon" />
          Xem chi tiết
          </button>
        </div>
      </div>

      <div class="accessory-colors">
        ${p.colors.map(c => `
          <span 
            class="color-item"
            style="background-color: ${c.code}"
            data-image="${c.image}"
            title="${c.name}">
          </span>
        `).join("")}
      </div>

      <p class="product-name">${p.name}</p>
      <p class="product-price">${p.price.toLocaleString("vi-VN")}đ</p>

    </div>
  `).join("");
}

export function renderAccessory({ category, type }) {
  const titleMap = {
    "tui-balo": "TÚI / BALO",
    "giay-dep": "GIÀY DÉP",
    "day-lung": "DÂY LƯNG"
  };

  const titleEl = document.getElementById("accessory-title");

  if (type && titleMap[type]) {
    titleEl.innerText = titleMap[type];

    document.getElementById("accessory-menu")?.classList.add("hide");
  } else {
    titleEl.innerText = "PHỤ KIỆN";
  }
  loadProducts({ category, type });
}

// Load sản phẩm
async function loadProducts({ category, type } = {}) {
  try {
    const res = await getProducts();

    if (!res.ok) {
      console.error("Lỗi:", res.data.message);
      return;
    }

    let products = res.data.products;

    // lọc theo loại
    if (category) {
      products = products.filter(p => p.category === category);
    }
    if (type) {
      products = products.filter(p => p.type === type);
    }
    renderProducts(products, "product-accessory");

  } catch (err) {
    console.error("Lỗi server:", err);
  }
}

export function initAccessory(options) {
  bindEvents();
  renderAccessory(options);
}


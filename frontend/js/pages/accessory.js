import { getProducts } from "../services/product.js";
import { openModal } from "../modules/modal.js";
import { bindEvents } from "../components/productEvents.js";
import { productCard } from "../components/productCard.js";

function renderProducts(products, elementId) {
  const container = document.getElementById(elementId);

  if (!products.length) {
    container.innerHTML = `<p>Không có sản phẩm nào</p>`;
    return;
  }
    container.innerHTML = products.map(productCard).join("");
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


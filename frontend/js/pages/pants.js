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

export function renderPants({ category, type }) {
  const titleMap = {
    "quan-short": "QUẦN SHORT",
    "quan-dai": "QUẦN DÀI"
  };

  const titleEl = document.getElementById("pants-title");

  if (type && titleMap[type]) {
    titleEl.innerText = titleMap[type];

    document.getElementById("pants-menu")?.classList.add("hide");
  } else {
    titleEl.innerText = "QUẦN";
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
    renderProducts(products, "product-pants");

  } catch (err) {
    console.error("Lỗi server:", err);
  }
}

export function initPants(options) {
  bindEvents();
  renderPants(options);
}



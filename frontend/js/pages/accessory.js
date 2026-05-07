import { getProducts } from "../services/product.js";

let isEventsBound = false;

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
          <button>
          <img src="../assets/icons/cart.svg" class="icon" />
          Mua nhanh
          </button>
          
          <div class="divider"></div>

          <button>
          <img src="../assets/icons/eye.svg" class="icon" />
          Xem chi tiết
          </button>
        </div>
      </div>

      <div class="colors">
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

// Click chuyển màu
function handleColorClick(e) {
  const color = e.target.closest(".color-item");
  if (!color) return;
  e.stopPropagation(); 

  const product = color.closest(".product");
  const id = product.dataset.id;
  const newImage = color.dataset.image;

  const img = document.getElementById(`img-${id}`);
  if (img) img.src = newImage;

  product.querySelectorAll(".color-item")
    .forEach(c => c.classList.remove("active"));

  color.classList.add("active");
}

function handleCardClick(e) {
  const card = e.target.closest(".product");
  if (!card) return;

  const id = card.dataset.id;
  window.location.href = `product-detail.html?id=${id}`;
}

//scoped event
function bindEvents() {
  const container = document.getElementById("product-accessory");
  if (!container) return;

  container.addEventListener("click", (e) => {

    if (e.target.closest(".color-item")) {
      handleColorClick(e);
      return;
    }

    if (e.target.closest(".product")) {
      handleCardClick(e);
    }
  });
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

export function init() {
  bindEvents();
}

window.renderAccessory = renderAccessory;

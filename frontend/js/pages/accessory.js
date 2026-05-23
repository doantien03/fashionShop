import { getProducts } from "../services/product.js";

let isBound = false;

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

// Click chuyển màu
function handleColorClick(e) {
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
  product.querySelectorAll(".color-item")
         .forEach(c => c.classList.remove("active"));

  color.classList.add("active");
}

function handleCardClick(card) {
  const id = card.dataset.id;
  history.pushState({}, "", `/product/${id}`);
  window.renderRoute(`/product/${id}`);
}

// chọn vùng sự kiện click
function bindEvents() {
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
    const card = e.target.closest(".product");
    if (card) {
      handleCardClick(card);
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

export function initAccessory(options) {
  bindEvents();
  renderAccessory(options);
}


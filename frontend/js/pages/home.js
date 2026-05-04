import { getProducts } from "../services/product.js";

let isBound = false;
let allProducts = [];

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

      <div class="colors">
        ${p.colors.map(c => `
          <span 
            class="color-item"
            style="background-color: ${c.name}"
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

      console.log("🛒 Mua nhanh:", id);
      
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

// sự kiện click menu
function menuEvents() {
  document.querySelectorAll(".menu span").forEach(item => {
    item.addEventListener("click", () => {

      document.querySelectorAll(".menu span")
      .forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const type = item.dataset.type;

      //  ÁO
      if (type.startsWith("ao-")) {
        const filtered = allProducts.filter(
          p => p.category === "ao" && p.type === type
        );
        renderProducts(filtered, "product-shirt");
        return;
      }

      // QUẦN
      if (type.startsWith("quan-")) {
        const filtered = allProducts.filter(
          p => p.category === "quan" && p.type === type
        );
        renderProducts(filtered, "product-pants");
        return;
      }

      // PHỤ KIỆN
      if (type === "tui-balo" || type === "giay-dep" || type === "day-lung") {
        const filtered = allProducts.filter(
          p => p.category === "phu-kien" && p.type === type
        );
        renderProducts(filtered, "product-accessory");
        return;
      }
    });
  });
}

// Load sản phẩm
async function loadProducts() {
  try {
    const res = await getProducts();

    if (!res.ok) {
      console.error("Lỗi:", res.data.message);
      return;
    }
    allProducts = res.data.products;

    const shirts = allProducts.filter(p => p.category === "ao");
    const pants = allProducts.filter(p => p.category === "quan");
    const accessory = allProducts.filter(p => p.category === "phu-kien");

    renderProducts(shirts, "product-shirt");
    renderProducts(pants, "product-pants");
    renderProducts(accessory, "product-accessory");

  } catch (err) {
    console.error("Lỗi server:", err);
  }
}

export function init() {
  loadProducts();
  bindEvents();
  menuEvents();
}

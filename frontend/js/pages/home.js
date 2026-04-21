import { fetchProductsAPI } from "../services/product.js";

function renderProducts(products) {
  const container = document.getElementById("product-list");

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

function handleColorClick(e) {
  const color = e.target.closest(".color-item");
  if (!color) return;
  e.stopPropagation(); 

  const product = color.closest(".product");
  const id = product.dataset.id;
  const newImage = color.dataset.image;

  const img = document.getElementById(`img-${id}`);
  if (img) img.src = newImage;

  // highlight màu đang chọn
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

function initEvents() {
  const container = document.getElementById("product-list");

  container.addEventListener("click", (e) => {
    // ưu tiên xử lý click màu trước
    if (e.target.closest(".color-item")) {
      handleColorClick(e);
      return;
    }

    handleCardClick(e);
  });
}

async function loadProducts() {
  try {
    const { ok, data } = await fetchProductsAPI();

    if (ok) {
      renderProducts(data.products);
      initEvents(); 
    } else {
      console.error("Lỗi lấy sản phẩm:", data.message);
    }

  } catch (err) {
    console.error("Lỗi kết nối server:", err);
  }
}

loadProducts();
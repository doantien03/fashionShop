import { getProducts } from "../services/product.js";
import { openModal } from "../modules/modal.js";
import { bindEvents } from "../components/productEvents.js";

let allProducts = [];

function initBanner() {
  const slides = document.querySelectorAll(".banner-slide");
  const dotsContainer = document.getElementById("banner-dots");
  let current = 0;

  // tạo dots
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    if(index === 0){
      dot.classList.add("active");
    }
    dot.onclick = () => {
      showSlide(index);
    };
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");
  function showSlide(index){
    slides.forEach(slide =>
      slide.classList.remove("active")
    );
    dots.forEach(dot =>
      dot.classList.remove("active")
    );
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    current = index;
  }
  document.getElementById("next-banner").onclick = () => {
      let next = (current + 1) % slides.length;
      showSlide(next);
  };
  document.getElementById("prev-banner")
    .onclick = () => {
      let prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
  };

}

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

      <div class="btn-colors">
        ${p.colors.map(c => `
          <span 
            class="color-item"
            style="background-color: ${c.code}"
            data-image="${c.image}"
            data-name="${c.name}"
            title="${c.name}">
          </span>
        `).join("")}
      </div>

      <p class="product-name">${p.name}</p>
      <p class="product-price">${p.price.toLocaleString("vi-VN")}đ</p>

    </div>
  `).join("");
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

export function initHome() {
  loadProducts();
  bindEvents();
  menuEvents();
  initBanner()
}

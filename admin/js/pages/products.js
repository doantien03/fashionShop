import { getProducts } from "../services/products.js";

export function renderProducts() {
  return `
    <main class="admin-products">
      <div class="page-header">
        <h1>Quản lý sản phẩm</h1>
      </div>

      <div id="products-container"></div>
    </main>
  `;
}

export async function initProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  const data = await getProducts();
  const products = data.products || [];

  container.innerHTML = products.map(p => `
    <div class="product-item">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
    </div>
  `).join("");
}
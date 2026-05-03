import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

// Lấy tất cả sản phẩm
export async function getProducts() {
  const res = await fetch(ENDPOINTS.products.getAll, {
    headers: getHeaders()
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// Lấy sản phẩm theo id
export async function getProduct(id) {
  const res = await fetch(ENDPOINTS.products.getById(id), {
    headers: getHeaders()
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// Lấy theo category
export async function getProductsByCategory(category) {
  const res = await fetch(ENDPOINTS.products.getByCategory(category), {
    headers: getHeaders()
  });
  const data = await res.json();
  return { ok: res.ok, data };
}
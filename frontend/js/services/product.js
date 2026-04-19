import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

// Lấy tất cả sản phẩm
export async function fetchProductsAPI() {
  const res = await fetch(ENDPOINTS.products.getAll, {
    headers: getHeaders()
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// Lấy 1 sản phẩm theo id
export async function fetchProductByIdAPI(id) {
  const res = await fetch(ENDPOINTS.products.getById(id), {
    headers: getHeaders()
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// Lấy sản phẩm theo category
export async function fetchProductsByCategoryAPI(slug) {
  const res = await fetch(ENDPOINTS.products.getByCategory(slug), {
    headers: getHeaders()
  });
  const data = await res.json();
  return { ok: res.ok, data };
}
import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

export async function getProducts() {
  try {
    const res = await fetch(ENDPOINTS.products, {
      headers: getHeaders()
    });

    return await res.json();
  } catch (err) {
    console.error("getProducts error:", err);
    return { products: [] };
  }
}
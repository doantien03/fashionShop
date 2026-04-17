export const API = "http://localhost:5000/api";

export const ENDPOINTS = {
  auth: {
    login: `${API}/auth/login`,
    register: `${API}/auth/register`,
    // logout: `${API}/auth/logout`,
  },
  products: {
    getAll: `${API}/products`,
    getById: (id) => `${API}/products/${id}`,
    getByCategory: (slug) => `${API}/products?category=${slug}`,
  },
  cart: {
    get: `${API}/cart`,
    add: `${API}/cart/add`,
    update: `${API}/cart/update`,
    remove: (id) => `${API}/cart/${id}`,
  },
  orders: {
    create: `${API}/orders`,
    getAll: `${API}/orders`,
    getById: (id) => `${API}/orders/${id}`,
  }
};

// helper dùng chung 
export function getHeaders(requireAuth = false) {
  const headers = { "Content-Type": "application/json" };
  if (requireAuth) {
    const token = localStorage.getItem("token");
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}
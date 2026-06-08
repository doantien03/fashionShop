export const API = "http://localhost:5000/api";

export const ENDPOINTS = {
  // auth
  login: `${API}/auth/login`,
  register: `${API}/auth/register`,
  profile: `${API}/auth/profile`,

  // products
  products: `${API}/products`,
  productById: (id) => `${API}/products/${id}`,

  // orders
  orders: `${API}/orders`,
  orderById: (id) => `${API}/orders/${id}`,
  updateStatus: (id) => `${API}/orders/${id}/status`,

  // users 
  users: `${API}/users`,
  userById: (id) => `${API}/users/${id}`,
};

export function getHeaders(requireAuth = false) {
  const headers = { "Content-Type": "application/json" };

  if (requireAuth) {
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}
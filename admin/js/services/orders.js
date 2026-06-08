import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

// GET ALL ORDERS
export async function getOrders() {
  const res = await fetch(ENDPOINTS.orders, {
    method: "GET",
    headers: getHeaders(true),
  });

  return await res.json();
}

// GET BY ID
export async function getOrderById(id) {
  const res = await fetch(ENDPOINTS.orderById(id), {
    method: "GET",
    headers: getHeaders(true),
  });

  return await res.json();
}

// UPDATE STATUS
export async function orderStatus(id, status) {
  const res = await fetch(ENDPOINTS.updateStatus(id), {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify({ status }),
  });

  return await res.json();
}

// DELETE ORDER
export async function deleteOrder(id) {
  const res = await fetch(ENDPOINTS.orderById(id), {
    method: "DELETE",
    headers: getHeaders(true),
  });

  return await res.json();
}
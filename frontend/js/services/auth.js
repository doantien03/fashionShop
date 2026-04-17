import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

//gọi API, trả data về 
export async function loginAPI(email, password) {
  const res = await fetch(ENDPOINTS.auth.login, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  return { ok: res.ok, data };
}

export async function registerAPI(name, email, password) {
  const res = await fetch(ENDPOINTS.auth.register, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  return { ok: res.ok, data };
}
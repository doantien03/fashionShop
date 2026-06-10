import {
  ENDPOINTS,
  getHeaders
}
from "../config/apiConfig.js";

export async function
getDashboardStats(){

  const res =
    await fetch(
      ENDPOINTS.dashboard.stats,
      {
        headers:
          getHeaders(true)
      }
    );

  return res.json();
}
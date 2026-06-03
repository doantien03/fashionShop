import { ENDPOINTS, getHeaders } from "../config/apiConfig.js";

// Lấy danh sách bài viết
export async function getNews() {
  const res = await fetch(ENDPOINTS.news.getAll,
    {
      headers: getHeaders()
    }
  );
  const data = await res.json();
  return {
    ok: res.ok,
    data
  };
}

// Lấy chi tiết bài viết
export async function getNewsDetail(slug) {
  const res = await fetch(ENDPOINTS.news.getBySlug(slug),
    {
      headers: getHeaders()
    }
  );
  const data = await res.json();
  return {
    ok: res.ok,
    data
  };
}
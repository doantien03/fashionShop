import { getNewsDetail } from "../services/news.js";

export async function initNewsDetail(path) {
  const slug = path.split("/thong-tin/")[1];
  if (!slug) return;
  try {
    const res = await getNewsDetail(slug);
    if (!res.ok) {
      document.querySelector(".news-detail-container").innerHTML = `
        <h2>Không tìm thấy bài viết</h2>
      `;
      return;
    }
    const article = res.data.article;
    document.title = article.title;
    document.getElementById("detail-title").textContent = article.title;
    document.getElementById("detail-date").textContent = article.date;
    document.getElementById("detail-banner").src = article.bannerImage;
    document.getElementById("detail-banner").alt = article.title;
    document.getElementById("detail-content").innerHTML = article.content;
    } 
    catch (error) {
    console.error(error);

    document.querySelector(".news-detail-container").innerHTML = `
      <h2>Có lỗi xảy ra</h2>
    `;
  }
}
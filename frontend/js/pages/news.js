import { getNews } from "../services/news.js";

export async function initNews() {
  const newsGrid = document.querySelector(".news-grid");
  if (!newsGrid) return;
  try {
    const res = await getNews();
    if (!res.ok) {
      newsGrid.innerHTML = "<p>Không tải được dữ liệu.</p>";
      return;
    }
    const articles = res.data.articles;

    newsGrid.innerHTML = articles.map(article => `
      <article class="news-card">
        <div class="news-image">
          <img
            src="${article.bannerImage}"
            alt="${article.title}"
          >
        </div>

        <div class="news-content">
          <div class="news-date">
            ${article.date}
          </div>

          <h3>
            ${article.title}
          </h3>

          <div class="line"></div>

          <p>
            ${article.summary}
          </p>

          <a href="/thong-tin/${article.slug}">
            XEM THÊM +
          </a>

        </div>
      </article>
    `).join("");

  } catch (error) {
    console.error(error);

    newsGrid.innerHTML = "<p>Có lỗi xảy ra.</p>";
  }
}
const { newsData } = require("../data/newsData");

// Danh sách bài viết
const getNews = (req, res) => {
  const articles = newsData.map(item => ({
    slug: item.slug,
    title: item.title,
    date: item.date,
    bannerImage: item.bannerImage,
    summary: item.summary
  }));
  res.json({
    success: true,
    articles
  });
};

// Chi tiết bài viết
const getNewsDetail = (req, res) => {
  const article = newsData.find(
    item => item.slug === req.params.slug
  );
  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy bài viết"
    });
  }
  res.json({
    success: true,
    article
  });
};

module.exports = { getNews,getNewsDetail }; 
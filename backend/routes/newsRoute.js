const express = require("express");
const { getNews, getNewsDetail } = require("../controllers/newsController");

const router = express.Router();

// API danh sách bài viết
router.get("/", getNews);
// API chi tiết bài viết
router.get("/:slug", getNewsDetail);

module.exports = router;
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Lấy tất cả hoặc theo category
router.get("/", (req, res) => {
  if (req.query.category) {
    return productController.getProductsByCategory(req, res);
  }
  return productController.getProducts(req, res);
});

// Lấy 1 sản phẩm theo id
router.get("/:id", productController.getProductById);

module.exports = router;
const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware =require("../middlewares/authMiddleware");
const adminMiddleware =require("../middlewares/adminMiddleware");


// User
// Lấy tất cả hoặc theo category
router.get("/", (req, res) => {
  if (req.query.category) {
    return productController.getProductsByCategory(req, res);
  }
  return productController.getProducts(req, res);
});

// Lấy 1 sản phẩm theo id
router.get("/:id", productController.getProductById);

// Admin (CRUD sản phẩm)
router.post("/",authMiddleware,adminMiddleware,productController.createProduct); 
router.put("/:id",authMiddleware,adminMiddleware,productController.updateProduct);
router.delete("/:id",authMiddleware,adminMiddleware,productController.deleteProduct);

module.exports = router;
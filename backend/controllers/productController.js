const Product = require("../models/product");

// Lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy 1 sản phẩm theo id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy sản phẩm theo loại
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.query.category,
      isActive: true
    });
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

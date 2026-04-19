const mongoose = require("mongoose");
const Product = require("../models/product");
const products = require("./products.json");
require("dotenv").config({ path: "../.env" });

console.log("MONGO_URI:", process.env.MONGO_URI);

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Kết nối MongoDB thành công!");

    await Product.deleteMany();
    console.log("Đã xóa data cũ!");

    await Product.insertMany(products);
    console.log("Import sản phẩm thành công!");

    process.exit();

  } catch (err) {
    console.error("Lỗi:", err);
    process.exit(1);
  }
};

seedProducts();
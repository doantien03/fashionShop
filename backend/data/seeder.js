const mongoose = require("mongoose");
const Product = require("../models/product");
const products = require("./products.json");
require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const seedProducts = async () => {
  try {
    // Kết nối DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Kết nối MongoDB thành công!");

    // Lặp từng sản phẩm
    for (const item of products) {
      await Product.updateOne(
        { name: item.name },   
        { $set: item },       
        { upsert: true }      
      );
    }

    console.log("Thêm / cập nhật sản phẩm thành công!");
    process.exit();

  } catch (err) {
    console.error("Lỗi:", err);
    process.exit(1);
  }
};

seedProducts();
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

// admin (CRUD Sản phẩm)
exports.createProduct = async(req,res)=>{
  try{
    const product = await Product.create(req.body);
    res.status(201).json({
      success:true,
      product
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

exports.updateProduct = async(req,res)=>{
  try{
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new:true
        }
      );
    res.json({
      success:true,
      product
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

exports.deleteProduct = async(req,res)=>{
  try{
    await Product.findByIdAndDelete(
      req.params.id
    );
    res.json({
      success:true,
      message:"Xóa thành công"
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};
const Cart = require("../models/cart");

// thêm sản phẩm cart
const addToCart = async(req,res)=>{
  try{
    // Chỉ user mới được thêm vào giỏ
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản admin không được phép thêm sản phẩm vào giỏ hàng"
      });
      }
      
    const { productId,color,size,quantity=1 } = req.body;
    const userId = req.user.id;
    let cart = await Cart.findOne({
      user:userId
    });
    // chưa có cart
    if(!cart){
      cart = await Cart.create({
        user:userId,
        items:[]
      });
    }
    // tìm sản phẩm
    const existing = cart.items.find(item=>
        item.productId.toString() ===productId &&
        item.color===color &&
        item.size===size
      );
    // có rồi => tăng SL
    if(existing){
      existing.quantity+=quantity;
    }
    // chưa có => thêm mới
    else{
      cart.items.push({ productId,color,size,quantity });
    }
    await cart.save();
    res.json({
      message:"Đã thêm vào giỏ",
      cart
    });
  }
  catch(err){
    res.status(500).json({
      message:"Lỗi server"
    });
  }
};

const getCart = async(req,res)=>{
  try{
    const cart = await Cart.findOne({
        user:req.user.id
      }).populate(
        "items.productId"
      );
    if(!cart){
      return res.json({
        items:[]
      });
    }
    res.json(cart);
  }
  catch(error){
    res.status(500).json({
      message:"Lỗi server"
    });
  }
};

// xóa sản phẩm
const removeCartItem = async(req,res)=>{
  try{
    const { productId,size,color } = req.body;
    const cart = await Cart.findOne({
      user:req.user.id
    });
    if(!cart){
      return res.status(404).json({
        message:"Không tìm thấy giỏ hàng"
      });
    }
    cart.items = cart.items.filter(item =>
      !(
        item.productId.toString() === productId &&
        item.size===size &&
        item.color===color
      )
    );
    await cart.save();
    res.json({
      message:"Đã xóa"
    });
  }
  catch{
    res.status(500).json({
      message:"Lỗi server"
    });
  }
};

//cập nhật số lượng
const updateCart = async(req,res)=>{
  try{
    const {productId,size,color,type} = req.body;
    const cart = await Cart.findOne({
      user:req.user.id
    });
    const item = cart.items.find(item=>
        item.productId.toString() === productId &&
        item.size===size &&
        item.color===color
      );
    if(!item){
      return res.status(404).json({
        message:"Không tìm thấy sản phẩm"
      });
    }
    if(type === "increase"){
      item.quantity++;
    }
    if( type==="decrease" && item.quantity>1 ){
      item.quantity--;
    }
    await cart.save();
    res.json({
      message:"Đã cập nhật"
    });
  }
  catch{
    res.status(500).json({
      message:"Lỗi server"
    });
  }
};

// xóa toàn bộ giỏ hàng sau khi đặt hàng
const clearCart = async (req,res) => {
  try{
    const cart = await Cart.findOne({
      user:req.user.id
    });
    if(cart){
      cart.items = [];
      await cart.save();
    }
    res.json({
      success:true,
      message:"Đã xóa giỏ hàng"
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};

module.exports = {addToCart,getCart,removeCartItem,updateCart,clearCart};
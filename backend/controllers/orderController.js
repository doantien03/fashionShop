const Order = require("../models/order");

// tạo đơn hàng
exports.createOrder = async (req, res) => {
  try {
    const {customerName,email,phone,city,district,ward,address,note,items,paymentMethod} = req.body;
    const user = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success:false,
        message:"Giỏ hàng trống"
      });
    }
    // tính tổng tiền từ items
    const totalPrice = items.reduce(
      (sum,item)=> sum + ( item.price * item.quantity), 0);

    const order = await Order.create({
      user,
      customerName,
      email,
      phone,
      city,
      district,
      ward,
      address,
      note,
      items,
      totalPrice,
      paymentMethod
    });

    res.status(201).json({
      success:true,
      message:"Tạo đơn hàng thành công",
      order
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};

// lấy tất cả đơn hàng
exports.getOrders = async(req,res)=>{
  try{
    const orders = await Order.find().sort({
      createdAt:-1
    });
    res.json({
      success:true,
      total:orders.length,
      orders
    });
  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};


// lấy 1 đơn hàng
exports.getOrderById = async(req,res)=>{
  try{
    const order = await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({
        success:false,
        message:"Không tìm thấy đơn hàng"
      });
    }
    res.json({
      success:true,
      order
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};

// lấy đơn hàng của user đang đăng nhập
exports.getMyOrders = async(req,res)=>{
  try{
    const orders = await Order.find({
      user:req.user.id
    })
    .sort({
      createdAt:-1
    });

    res.json({
      success:true,
      orders
    });

  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};

// trạng thái cập nhật
exports.orderStatus = async(req,res)=>{

  try{
    const {status} = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new:true }
    );
    if(!order){
      return res.status(404).json({
        success:false,
        message:"Không tìm thấy đơn"
      });
    }
    res.json({
      success:true,
      message:"Cập nhật thành công",
      order
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};

// user hủy đơn
exports.cancelOrder = async(req,res)=>{
  try{
    const order = await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({
        success:false,
        message:"Không tìm thấy đơn hàng"
      });
    }
    if(order.user.toString() !== req.user.id){
      return res.status(403).json({
        success:false,
        message:"Không có quyền"
      });
    }
    if(order.status !== "pending"){
      return res.status(400).json({
        success:false,
        message:"Không thể hủy"
      });
    }
    order.status = "cancelled";
    await order.save();
    res.json({
      success:true,
      message:"Đã hủy đơn hàng"
    });

  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};

// admin xóa đơn hàng
exports.deleteOrder = async(req,res)=>{
  try{
    const order = await Order.findByIdAndDelete(
      req.params.id
    );
    if(!order){
      return res.status(404).json({
        success:false,
        message:"Không tìm thấy đơn"
      });
    }
    res.json({
      success:true,
      message:"Xóa thành công"
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Lỗi server"
    });
  }
};
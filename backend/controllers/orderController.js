const Order = require("../models/order");
const Product = require("../models/product");

// state machine
const ORDER_FLOW = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipping", "cancelled"],
  shipping: ["completed", "cancelled"],
  completed: [],
  cancelled: []
};
// tạo đơn hàng
exports.createOrder = async (req, res) => {
  try {
    // Chặn admin đặt hàng
    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản admin không được phép đặt hàng"
      });
    }
    
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

// admin cập nhật trạng thái đơn
exports.orderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn"
      });
    }

    if (order.status === "completed" || order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Đơn đã đóng, không thể thay đổi"
      });
    }

    const allowed = ORDER_FLOW[order.status] || [];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Không thể chuyển từ ${order.status} sang ${status}`
      });
    }

    //stock handling
    if (status === "cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }
    }

    order.status = status;
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status,
      changedAt: new Date()
    });

    await order.save();
    res.json({
      success: true,
      message: "Cập nhật thành công",
      order
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server"
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
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

exports.getDashboardStats = async(req,res)=>{
  try{
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const orders = await Order.find();
    const revenue = orders.reduce(
        (sum,order)=> sum + (order.totalPrice || 0),
        0 );
    const latestOrders = await Order.find().sort({createdAt:-1}).limit(5);

    res.json({
      success:true,
      totalOrders,
      totalProducts,
      totalUsers,
      revenue,
      latestOrders,
    });

  }
  catch(error){
    res.status(500).json({
      success:false
    });

  }

};
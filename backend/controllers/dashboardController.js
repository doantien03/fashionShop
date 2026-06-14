const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

exports.getDashboard = async (req, res) => {
  try {
    const [totalOrders,totalProducts,totalUsers,pendingOrders,shippingOrders,completedOrders,cancelledOrders] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "shipping" }),
      Order.countDocuments({ status: "completed" }),
      Order.countDocuments({ status: "cancelled" })
    ]);

    // daonh thu khi đơn hoàn thành
    const revenueResult = await Order.aggregate([
      {
        $match: {status: "completed"}
      },
      {
        $group: {_id: null,
        total: { $sum: "$totalPrice"}
        }
      }
    ]);

    const revenue = revenueResult[0]?.total || 0;
    // hôm nay
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);

    const todayRevenueResult = await Order.aggregate([
        {
          $match: {
            status: "completed",
            createdAt: {
              $gte: startToday
            }
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalPrice"
            }
          }
        }
      ]);

    const todayRevenue = todayRevenueResult[0]?.total || 0;
    // tháng này

    const startMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const monthRevenueResult = await Order.aggregate([
        {
          $match: {
            status: "completed",
            createdAt: {
              $gte: startMonth
            }
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalPrice"
            }
          }
        }
      ]);

    const monthRevenue = monthRevenueResult[0]?.total || 0;
    // đơn mới
    const latestOrders = await Order.find().sort({createdAt: -1}).limit(5);
    res.json({
      success: true,
      totalOrders,
      totalProducts,
      totalUsers,
      pendingOrders,
      shippingOrders,
      completedOrders,
      cancelledOrders,
      revenue,
      todayRevenue,
      monthRevenue,
      latestOrders
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server"
    });
  }
};
const express = require("express");

const router = express.Router();
const {createOrder,getOrders,getOrderById,orderStatus,deleteOrder,getMyOrders,cancelOrder} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

//user
router.post("/",authMiddleware,createOrder);  // tạo đơn hàng
router.get("/my-orders",authMiddleware,getMyOrders); //lấy danh sách đơn hàng của user
router.get("/:id",authMiddleware,getOrderById);   // xem chi tiết đơn
router.put("/:id/cancel",authMiddleware,cancelOrder); // hủy đơn hàng

//admin
router.get("/",authMiddleware,getOrders);     // lấy all lịch sử đơn hàng user
router.put("/:id/status",authMiddleware,adminMiddleware,orderStatus);   // cập nhật trạng thái
router.delete("/:id",authMiddleware,adminMiddleware,deleteOrder);  // xóa đơn


module.exports = router;
const express = require("express");

const router = express.Router();
const {createOrder,getOrders,getOrderById,orderStatus,deleteOrder} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/",authMiddleware,createOrder);  // tạo đơn hàng
router.get("/",authMiddleware,getOrders);     // lấy lịch sử đơn hàng user
router.get("/:id",authMiddleware,getOrderById);   // xem chi tiết đơn
router.put("/:id/status",authMiddleware,adminMiddleware,orderStatus);   // cập nhật trạng thái
router.delete("/:id",authMiddleware,adminMiddleware,deleteOrder);  // xóa đơn

module.exports = router;
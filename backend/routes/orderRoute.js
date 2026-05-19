const express = require("express");

const router = express.Router();
const {createOrder,getOrders,getOrderById,orderStatus,deleteOrder} = require("../controllers/orderController");

router.post("/",createOrder);
router.get("/",getOrders);
router.get("/:id",getOrderById);
router.put("/:id/status",orderStatus);
router.delete("/:id",deleteOrder);

module.exports = router;
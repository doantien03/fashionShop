const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {addToCart,getCart,removeCartItem,updateCart,clearCart} = require("../controllers/cartController");

router.post("/add",authMiddleware,addToCart);
router.get("/",authMiddleware,getCart);
router.delete("/remove",authMiddleware,removeCartItem);
router.put("/update",authMiddleware,updateCart);
router.delete("/clear",authMiddleware,clearCart);

module.exports = router;
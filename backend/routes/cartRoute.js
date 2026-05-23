const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {addToCart,getCart,removeCartItem,updateCart} = require("../controllers/cartController");

router.post("/add",authMiddleware,addToCart);
router.get("/",authMiddleware,getCart);
router.delete("/remove",authMiddleware,removeCartItem);
router.put("/update",authMiddleware,updateCart);

module.exports = router;
const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/stats",authMiddleware,adminMiddleware,getDashboardStats);
module.exports = router;
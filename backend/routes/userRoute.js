const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
// user
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.getProfile);
router.put("/me", authMiddleware, userController.updateProfile);

// admin
router.get("/", userController.getUsers);

module.exports = router;
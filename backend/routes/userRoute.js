const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user
router.post("/register", userController.register);
router.post("/login", userController.login);

// admin
router.get("/", userController.getUsers);

module.exports = router;
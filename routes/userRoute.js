const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");
//user controller
const { register, login, checkUser } = require("../controller/userController");
router.post("/register", register);
//
router.post("/login", login);
//
router.get("/check", authmiddleware, checkUser);
module.exports = router;

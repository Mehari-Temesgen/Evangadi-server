const express = require("express");
const likeRouter = express.Router();
const { createAnswerLike } = require("../controller/likeControler");
const authmiddleware = require("../middleware/authmiddleware");
likeRouter.post("/answer/:answerid/like", authmiddleware, createAnswerLike);
module.exports = likeRouter;

const express = require("express");
const likeRouter = express.Router();
const {
  createAnswerLike,
  getAnswerLike,
} = require("../controller/likeControler");
const authmiddleware = require("../middleware/authmiddleware");
likeRouter.post("/answer/:answerid/like", authmiddleware, createAnswerLike);
likeRouter.get("/answer/:answerid", authmiddleware, getAnswerLike);
module.exports = likeRouter;

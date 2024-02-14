const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");
const { postanswer, getAnswer } = require("../controller/AnswerControl");
router.get("/:questionid", authmiddleware, getAnswer);
router.post("/:questionid/create", authmiddleware, postanswer);
module.exports = router;

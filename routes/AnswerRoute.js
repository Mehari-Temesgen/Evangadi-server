const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");
const { postanswer, getAnswer } = require("../controller/AnswerControl");

router.post("/:questionid/create", authmiddleware, postanswer);
router.get("/:questionid", authmiddleware, getAnswer);
module.exports = router;

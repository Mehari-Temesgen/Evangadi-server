const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { postquestion, getquestions } = require("../controller/QuestionControl");
const router = express.Router();
router.get("/", authmiddleware, getquestions);
router.post("/create", authmiddleware, postquestion);
module.exports = router;

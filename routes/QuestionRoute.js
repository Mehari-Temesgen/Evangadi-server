const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { postquestion, getquestions } = require("../controller/QuestionControl");
const router = express.Router();
router.get("/all-question", authmiddleware, (req, res) => {
  res.send("all question");
});
router.post("/onequestion", postquestion);
router.get("/allquestion", getquestions);
module.exports = router;

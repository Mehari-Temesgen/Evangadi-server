const connection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const createAnswerLike = async (req, res) => {
  const { answerid } = req.params;
  const userid = req.user.userid;
  try {
    const [like] = await connection.query(
      "SELECT *FROM answer_likes where userid=? and answerid =?",
      [answerid, userid]
    );
    if (like.length > 0) {
      return res.status(400).json({ msg: "Question already liked" });
    }
    await connection.query(
      "INSERT INTO answer_likes(userid,answerid ) VALUES(?,?)",
      [userid, answerid]
    );
    await connection.query(
      "UPDATE answers set like_count= (SELECT COUNT(*) FROM answer_likes where answerid =?) where answerid =?",
      [answerid, answerid]
    );
    res.status(201).json({ msg: "Question liked" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = { createAnswerLike };

const connection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const createAnswerLike = async (req, res) => {
  const { answerid } = req.params;
  const userid = req.user.userid;
  console.log(userid);
  try {
    const [like] = await connection.query(
      "SELECT *FROM answer_likes where userid=? and answerid =?",
      [answerid, userid]
    );
    if (like.length > 0) {
      return res.status(400).json({ msg: "Answer already liked" });
    }
    await connection.query(
      "INSERT INTO answer_likes(userid,answerid ) VALUES(?,?)",
      [userid, answerid]
    );
    // await connection.query(
    //   "UPDATE answers set like_count= (SELECT COUNT(*) FROM answer_likes where answerid =?) where answerid =?",
    //   [answerid, answerid]
    // );
    res.status(201).json({ msg: "answer liked" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getAnswerLike = async (req, res) => {
  try {
    const { answerid } = req.params;
    const [likes] = await connection.query(
      "SELECT *from answer_likes JOIN users ON answer_likes.userid=users.userid where answerid=? ",
      [answerid]
    );
    if (likes.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No like found for the given answer ID" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, try again later tesastehal" });
  }
};
module.exports = { createAnswerLike, getAnswerLike };

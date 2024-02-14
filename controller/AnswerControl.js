//db connection
const connection = require("../db/dbconfig");
// const authmiddleware = require("../middleware/authmiddleware");
const { StatusCodes } = require("http-status-codes");
const postanswer = async (req, res) => {
  const { answer } = req.body;
  const questionid = req.params.questionid;
  const userid = req.user.userid;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: " Please enter all fields " });
  }
  try {
    await connection.query(
      "INSERT INTO answers (userid,questionsid,answer) values(?,?,?)",
      [userid, questionid, answer]
    );

    await connection.query(
      " UPDATE questions SET comment_count =(SELECT COUNT(*) FROM answers WHERE questionsid = ?) WHERE questionsid = ?",
      [questionid, questionid]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Answer posted successfully" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Something went wrong, try again later ${error.message}`,
    });
  }
};
const getAnswer = async (req, res) => {
  // Assuming the questionid is sent as a URL parameter and accessed by req.params.questionid
  const questionsid = req.params.questionid;
  if (!questionsid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Question ID is required" });
  }
  try {
    const [answer] = await connection.query(
      "SELECT *from answers JOIN users ON answers.userid=users.userid where questionsid=? ORDER BY answers.answerid DESC",
      [questionsid]
    );
    if (answer.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No answers found for the given question ID" });
    }
    return res.status(StatusCodes.OK).json({ answer });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, try again later tesastehal" });
  }
};
module.exports = { postanswer, getAnswer };

//db connection
const connection = require("../db/dbconfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all information" });
  }
  try {
    //bellow query return two index array column name and property/datatype
    const [user] = await connection.query(
      "select userid,username from users where email=? or username=?",
      [email, username]
    );
    // console.log(user[0].password);
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user aleady register" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password at least 8 character" });
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPasword = await bcrypt.hash(password, salt);
    await connection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) values(?,?,?,?,?)",
      [username, firstname, lastname, email, hashPasword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "users registered !!!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: `something was wrong ${error.message}` });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required field" });
  }
  try {
    const [user] = await connection.query(
      "select userid,username,password from users where email=?",
      [email]
    );
    // console.log(user);
    // return res.json({ user: user });
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invaliad credential" });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invaliad credential pas" });
    }
    //distruct username and user id used to signed
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // return res.json({ user: user[0].password });
    return res.status(StatusCodes.OK).json({
      msg: "user login successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "something wrong !!" });
  }
};
const checkUser = async (req, res) => {
  const username = req.user.username;
  const userid = req.user.userid;
  res.json(req.user);
  // res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
};
module.exports = { register, login, checkUser };

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
//this middelware used to verify generated token
async function authmiddleware(req, res, next) {
  //to extract token ues req.headers insted of req.body
  // token get from headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication is invalid from token !!!" });
  }
  const token = authHeader.split(" ")[1];
  // console.log(authHeader);
  // console.log(token);
  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
    // return res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send("something went wrong");
  }
}
module.exports = authmiddleware;

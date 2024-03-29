require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(json());
//db connetion
const connection = require("./db/dbconfig");
//user middlewire
const userRouter = require("./routes/userRoute");
app.use("/api/users", userRouter);
//question middlewire
const questionRoute = require("./routes/QuestionRoute");
const authmiddleware = require("./middleware/authmiddleware");
app.use("/api/questions", authmiddleware, questionRoute);
//answer middleware
const answerRouter = require("./routes/AnswerRoute");
app.use("/api/answer", answerRouter);
//
const likeRoute = require("./routes/likeRoutes");
app.use("/api/likes", likeRoute);
//image middleware
const imageRouter = require("./routes/imageRoutes");
app.use("/api/images", imageRouter);
app.use(
  "/api/all/images",
  express.static(path.join(__dirname, "./public/images"))
);
app.get("/", (req, res) => {
  res.send("API is running....");
});
async function start() {
  try {
    // const result = await connection.execute("select 'test' ");
    app.listen(port);
    console.log("databas connection");
    console.log(`listining at port ${port}`);
  } catch (error) {
    console.log(error);
  }
}
start();

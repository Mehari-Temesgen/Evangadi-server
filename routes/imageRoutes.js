const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const path = require("path");
const authmiddleware = require("../middleware/authmiddleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
const {
  createImage,
  getUserProfile,
  getAllUserImages,
} = require("../controller/imageController");
imageRouter.post(
  "/upload",
  authmiddleware,
  upload.single("avatar"),
  createImage
);
imageRouter.get("/profile", authmiddleware, getUserProfile);
imageRouter.get("/", authmiddleware, getAllUserImages);
module.exports = imageRouter;

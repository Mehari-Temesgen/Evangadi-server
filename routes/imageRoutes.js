const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const path = require("path");
const authmiddleware = require("../middleware/authmiddleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
const { createImage } = require("../controller/imageController");
imageRouter.post(
  "/upload",
  authmiddleware,
  upload.single("avatar"),
  createImage
);
module.exports = imageRouter;

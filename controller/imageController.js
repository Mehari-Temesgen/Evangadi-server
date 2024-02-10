const connection = require("../db/dbconfig");
const path = require("path");
const createImage = async (req, res) => {
  try {
    const file = req.file;
    if (file) {
      const filename = file.filename;
      const [imageData] = await connection.query(
        "SELECT *FROM user_images where userid=?",
        [req.body.userId]
      );
      if (imageData.length > 0) {
        //update the image
        await connection.query(
          "UPDATE user_images set filename=? where userid=?",
          [filename, req.body.userId]
        );
        return res.status(201).json({ msg: "Image updated" });
      }
      //create a new image
      const result = await connection.query(
        "INSERT INTO user_images (userid,filename) VALUES(?,?)",
        [req.body.userId, filename]
      );
      res.status(201).json({ msg: "Image created" });
    } else {
      res.status(400).json({ msg: "No image provided" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = { createImage };

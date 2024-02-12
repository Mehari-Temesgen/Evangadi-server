const connection = require("../db/dbconfig");
const path = require("path");
const createImage = async (req, res) => {
  try {
    const file = req.file;
    if (file) {
      const filename = file.filename;
      const [imageData] = await connection.query(
        "SELECT *FROM user_images where userid=?",
        [req.user.userid]
      );
      if (imageData.length > 0) {
        //update the image
        await connection.query(
          "UPDATE user_images set filename=? where userid=?",
          [filename, req.user.userid]
        );
        return res.status(201).json({ msg: "Image updated" });
      }
      //create a new image
      const result = await connection.query(
        "INSERT INTO user_images (userid,filename) VALUES(?,?)",
        [req.user.userid, filename]
      );
      res.status(201).json({ msg: "Image created" });
    } else {
      res.status(400).json({ msg: "No image provided" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userid;
    const [userData] = await connection.query(
      "SELECT filename FROM user_images WHERE userid = ?",
      [userId]
    );
    console.log(userData[0].filename);
    if (!userData[0].filename) {
      return res.status(404).end();
    }
    const imagePath = path.join(
      __dirname,
      "..",
      "./public/images",
      userData[0].filename
    );
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllUserImages = async (req, res) => {
  try {
    const [allUserImages] = await connection.query(
      "SELECT userid, filename FROM user_images"
    );

    if (allUserImages.length === 0) {
      return res.status(404).json({ msg: "No images found" });
    }

    const userImagesMap = {};
    allUserImages.forEach((userData) => {
      userImagesMap[userData.userid] = userData.filename;
    });
    // console.log(userImagesMap);
    res.status(200).json(userImagesMap);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = { createImage, getUserProfile, getAllUserImages };

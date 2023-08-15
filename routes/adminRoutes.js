const express = require("express");
const router = express.Router();

const Game = require("../models/game");

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, path.join(__dirname, "../public/images"));
    } else if (file.fieldname === "game") {
      cb(null, path.join(__dirname, "../public/games"));
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, req.body.nameID + "." + file.mimetype.split("/")[1]);
    } else if (file.fieldname === "game") {
      cb(null, req.body.nameID + ".swf");
    }
  },
});
const upload = multer({ storage: storage });

router.post(
  "/games/create",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "game",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    const data = new Game({
      nameID: req.body.nameID,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      imageType: "",
    });
    try {
      data.imageType = req.files.image[0].mimetype.split("/")[1];
      const newData = await data.save();
      res
        .status(201)
        .send("Game saved to server!, Name ID is " + newData.nameID);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.patch("/games/update/:nameID", async (req, res) => {
  try {
    const id = req.params.nameID;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Game.findOneAndUpdate(
      { nameID: id },
      updatedData,
      options
    );
    res.send(id + " updated!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/games/delete/:nameID", async (req, res) => {
  try {
    const nameID = req.params.nameID;
    const data = await Game.findOneAndDelete({ nameID: nameID });
    res.send("Game with name ID " + nameID + " deleted!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

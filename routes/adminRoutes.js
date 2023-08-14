const express = require("express");
const router = express.Router();

const Game = require("../models/game");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("", (req, res) => {
  res.send("Oke mantap");
});

router.post("/games/create", jsonParser, async (req, res) => {
  const data = new Game({
    nameID: req.body.nameID,
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    imageType: req.body.imageType,
  });
  try {
    const newData = await data.save();
    res.status(201).send("Game saved to database!, ID is " + newData._id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/games/update/:nameID", jsonParser, async (req, res) => {
  try {
    const id = req.params.nameID;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Game.findOneAndUpdate(
      { nameID: id },
      updatedData,
      options
    );
    res.send("Game updated!");
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

const express = require("express");
const router = express.Router();

const Game = require("../models/game");

router.get("", (req, res) => {
  res.status(404).send("Specify the API!");
});

router.get("/data/get", async (req, res) => {
  try {
    const data = await Game.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/data/get/:nameID", async (req, res) => {
  try {
    const data = await Game.findOne({ nameID: req.params.nameID });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/images/get/:nameID", async (req, res) => {
  try {
    const data = await Game.findOne({ nameID: req.params.nameID });
    res.sendFile("/images/" + req.params.nameID + "." + data.imageType, {
      root: __dirname + "/../public",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/games/get/:nameID", async (req, res) => {
  try {
    res.sendFile("/games/" + req.params.nameID + ".swf", {
      root: __dirname + "/../public",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

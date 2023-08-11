const express = require("express");
const router = express.Router();

const Game = require("../models/game");

router.get("", (req, res) => {
  res.status(404).send("Specify the API!");
});

router.get("/get", async (req, res) => {
  try {
    const data = await Game.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get/:nameID", async (req, res) => {
  try {
    const data = await Game.find({ nameID: req.params.nameID });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

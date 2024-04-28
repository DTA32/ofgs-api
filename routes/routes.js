const express = require("express");
const router = express.Router();

const Game = require("../models/game");

router.get("", (req, res) => {
  res.status(200).send("Hello from API! Please specify endpoint");
});

router.get("/data/get", async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 16;
    const data = await Game.find()
      .limit(parseInt(limit))
      .skip(parseInt(page) * parseInt(limit))
      .sort({ title: 1 });
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

router.get("/data/getRandom", async (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit : 4;
    const data = await Game.aggregate([{ $sample: { size: parseInt(limit) } }]);
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

/*
router.get("/games/get/:nameID", async (req, res) => {
  try {
    res.sendFile("/games/" + req.params.nameID + ".swf", {
      root: __dirname + "/../public",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
*/

module.exports = router;

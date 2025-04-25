const express = require("express");
const router = express.Router();

const gameManager = require("../managers/game");

router.get("/data/get", async (req, res) => {
    try {
        let page = req.query.page;
        if (page === undefined) {
            page = 0;
        } else if (page < 1){
            res.status(400).json({message: "Page cannot be less than 0"});
            return
        } else {
            page = parseInt(page);
            page--;
        }
        let limit = req.query.limit;
        if (limit === undefined) {
            limit = 16;
        }
        let rawIds = req.query.ids;
        let ids = [];
        if (rawIds) {
            if (rawIds.includes(',')) {
                ids = rawIds.split(',');
            } else {
                ids.push(rawIds);
            }
        }
        const category = req.query.category;
        const search = req.query.search;
        const {data, count} = await gameManager.fetchGame(limit, page, ids, category, search);
        res.json({
            data: data,
            maxPage: Math.ceil(count / limit),
            count: count,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get("/data/get/:nameID", async (req, res) => {
    try {
        const data = await gameManager.fetchGameById(req.params.nameID);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get("/data/getRandom", async (req, res) => {
    try {
        let limit = req.query.limit
        if (limit === undefined) {
            limit = 4;
        }
        const data = await gameManager.fetchGameRandom(limit);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get("/category/getNames", async (req, res) => {
    try {
        const data = await gameManager.fetchGameCategoriesName();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/*
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
*/

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

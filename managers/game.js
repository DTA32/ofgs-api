const Game = require("../models/game");

async function fetchGame(limit, page, multiGameId, category, searchQuery) {
    const option = {
        limit: parseInt(limit),
        skip: parseInt(page) * parseInt(limit),
        sort: { priority: -1, nameID: 1 },
    };
    let query = {};
    if (multiGameId.length > 0) {
        query = { nameID: { $in: multiGameId } };
    }
    if (category) {
        query.category = { $in: category };
    }
    if (searchQuery) {
        query.title = { $regex: searchQuery, $options: "i" };
    }
    const [data, count] = await Promise.all([
        Game.find(query, null, option),
        Game.countDocuments(query),
    ]);
    return {data, count};
}

async function fetchGameById(gameId){
    return Game.findOne({ nameID: gameId }, null, null);
} 

async function fetchGameRandom(limit){
    return Game.aggregate([{ $sample: { size: parseInt(limit) } }]);
}

async function fetchGameCategoriesName(){
    const result = await Game.aggregate([
        { $unwind: "$category" },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);
    return result.map(category => category._id);
}

module.exports = {
    fetchGame,
    fetchGameById,
    fetchGameRandom,
    fetchGameCategoriesName,
}
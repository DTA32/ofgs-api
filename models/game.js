const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  nameID: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("game", dataSchema);

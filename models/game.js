const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  nameID: {
    required: true,
    type: String,
    unique: true,
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
  imageType: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("game", dataSchema);

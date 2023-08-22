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
    unique: false,
  },
  category: {
    required: true,
    type: String,
    unique: false,
  },
  description: {
    required: false,
    type: String,
    unique: false,
  },
  imageType: {
    required: true,
    type: String,
    unique: false,
  },
});

module.exports = mongoose.model("game", dataSchema);

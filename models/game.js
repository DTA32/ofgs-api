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
    type: [String],
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
  dimension: {
    width: {
      required: true,
      type: Number,
      unique: false,
    },
    height: {
      required: true,
      type: Number,
      unique: false,
    },
  },
  status: {
    type: {
      required: true,
      type: Number,
      unique: false,
    },
    name: {
      required: true,
      type: String,
      unique: false,
    },
  },
  type: {
    required: true,
    type: Number,
    unique: false,
  },
});

module.exports = mongoose.model("game", dataSchema);

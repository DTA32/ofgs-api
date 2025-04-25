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
  developer: {
    name: {
      required: false,
      type: String,
      unique: false,
      default: null,
    },
    link: {
      required: false,
      type: String,
      unique: false,
      default: null,
    },
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
      required: false,
      type: Number,
      unique: false,
      default: null,
    },
    name: {
      required: false,
      type: String,
      unique: false,
    },
    description: {
      required: false,
      type: String,
      unique: false,
    }
  },
  type: {
    required: false,
    type: Number,
    unique: false,
    default: 1,
  },
  isPublic: {
    required: false,
    type: Boolean,
    unique: false,
    default: true,
  },
  priority: {
    required: false,
    type: Number,
    unique: false,
    default: 1,
  }
});

module.exports = mongoose.model("game", dataSchema);

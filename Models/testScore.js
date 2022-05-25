const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Score = new Schema({
  candidate: {
    type: mongoose.Schema.ObjectId,
    ref: "candidate",
    required: true,
  },
  test: {
    type: mongoose.Schema.ObjectId,
    ref: "test",
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("score", Score);

const mongoose = require("mongoose");
const playSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const PlayScoreModel = mongoose.model("gameScore", playSchema);

module.exports = { PlayScoreModel };

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  thoughtPic: {
    name: String,
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);

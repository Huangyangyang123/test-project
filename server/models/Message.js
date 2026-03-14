const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  content: String,
  isAI: Boolean,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
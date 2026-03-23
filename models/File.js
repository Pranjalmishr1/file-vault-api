const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  type: String,
  path: String
}, {
  timestamps: true
});

module.exports = mongoose.model("File", fileSchema);
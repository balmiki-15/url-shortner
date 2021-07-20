const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
});

const Url = mongoose.model('URLDB',urlSchema);
module.exports = Url;

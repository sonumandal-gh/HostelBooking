const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  homeName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }


});

module.exports = mongoose.model("Home", homeSchema);
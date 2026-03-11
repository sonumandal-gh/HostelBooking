const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const mongoConnect = () => {
  return mongoose.connect(MONGO_URL)
    .then(() => {
      console.log("MongoDB Connected Successfully");
    })
    .catch(err => {
      console.log("MongoDB Error:", err);
    });
};

module.exports = mongoConnect;
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const mongoConnect = () => {
  console.log("Connecting to MongoDB:", MONGO_URL ? "URL found" : "NO URL IN .ENV!");
  return mongoose.connect(MONGO_URL)
    .then(() => {
      console.log("MongoDB Connected Successfully");
    })
    .catch(err => {
      console.log("MongoDB Connection Error:", err.message);
      throw err;
    });
};

module.exports = mongoConnect;
const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://HostelBooking_mg:HostelBooking_mg@hostelbooking.phblptb.mongodb.net/HostelBooking";

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
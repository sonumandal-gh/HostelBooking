const mongodb = require("mongodb");           // MongoDB package
const MongoClient = mongodb.MongoClient;      // MongoClient extract

const MONGO_URL = "mongodb+srv://HostelBooking_mg:HostelBooking_mg@hostelbooking.phblptb.mongodb.net/?appName=HostelBooking";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)              // MongoDB connect
    .then(client => {
      _db = client.db("HostelBooking");       // Database select
      callback();                             // Server start signal
    })
    .catch(err => {
      console.log("Mongo error:", err);
    });
};


const getDb = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

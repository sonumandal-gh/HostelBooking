const { getDb } = require("../utils/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

module.exports = class Home {

  constructor(homeName, address, city, price, image) {
    this.homeName = homeName;
    this.address = address;
    this.city = city;
    this.price = price;
    this.image = image;
  }

  save() {
    const db = getDb();
    return db.collection("homes").insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(homeId) })
      .next();
  }

  /*  DELETE METHOD */
  static deleteById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(homeId) });
  }
};

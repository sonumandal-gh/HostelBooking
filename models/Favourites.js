const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

class Favourite {
  constructor(homeId, userId) {
    this.homeId = new ObjectId(homeId);
    this.userId = new ObjectId(userId);
  }

  save() {
    const db = getDb();
    return db.collection("favourites").insertOne(this);
  }

  static getFavourites(userId) {
    const db = getDb();
    return db.collection("favourites")
      .find({ userId: new ObjectId(userId) })
      .toArray();
  }
}

module.exports = Favourite;

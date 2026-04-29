const Favourite = require("../models/Favourites");
const Home = require("../models/home");


// ADD TO FAVOURITE
exports.postAddToFavourite = (req, res) => {

  const homeId = req.body.homeId;
  const userId = req.session.user._id;

  Favourite.create({
    homeId: homeId,
    userId: userId
  })
  .then(() => {
    res.status(201).json({ message: "Added to favourites" });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Failed to add to favourites" });
  });

};



// GET FAVOURITES
exports.getFavouriteList = (req, res) => {

  const userId = req.session.user._id;

  Favourite.find({ userId: userId })
    .then(favourites => {

      const favouriteIds = favourites.map(f => f.homeId);

      return Home.find({ _id: { $in: favouriteIds } });

    })
    .then(favouriteHomes => {
      res.status(200).json(favouriteHomes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch favourites" });
    });

};



// DELETE FAVOURITE
exports.postDeleteFavourite = (req, res) => {

  const homeId = req.params.homeId;
  const userId = req.session.user._id;

  Favourite.deleteOne({
    homeId: homeId,
    userId: userId
  })
  .then(() => {
    res.status(200).json({ message: "Favourite deleted successfully" });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Failed to delete favourite" });
  });

};
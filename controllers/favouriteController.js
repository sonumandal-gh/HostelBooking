const Favourite = require("../models/Favourites");
const Home = require("../models/home");


// 🔥 ADD TO FAVOURITE
exports.postAddToFavourite = (req, res) => {

  const homeId = req.body.homeId;
  const userId = req.session.user._id;

  const fav = new Favourite({
    homeId: homeId,
    userId: userId
  });

  fav.save()
    .then(() => {
      console.log("Home added to favourites");
      res.redirect("/favourites");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/hostels");
    });
};



//  GET FAVOURITE LIST
exports.getFavouriteList = (req, res) => {

  const userId = req.session.user._id;

  Favourite.find({ userId: userId })
    .then(favourites => {

      const favouriteIds = favourites.map(fav => fav.homeId);

      return Home.find({ _id: { $in: favouriteIds } });

    })
    .then(favouriteHomes => {

      res.render("store/favourites", {
        favouriteHomes,
        PageTitle: "My Favourites",
        cssFile: "favourite",
        isLoggedIn: req.isLoggedIn
      });

    })
    .catch(err => {
      console.log(err);
      res.redirect("/hostels");
    });
};



//  DELETE FAVOURITE
exports.postDeleteFavourite = (req, res) => {

  const homeId = req.params.homeId;
  const userId = req.session.user._id;

  Favourite.deleteOne({
    homeId: homeId,
    userId: userId
  })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/favourites");
    });
};
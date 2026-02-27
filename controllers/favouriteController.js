const Favourite = require("../models/Favourites");
const Home = require("../models/home");


// 🔥 ADD TO FAVOURITE
exports.postAddToFavourite = (req, res) => {

  const homeId = req.body.homeId;
  const userId = req.session.user._id;

  const fav = new Favourite(homeId, userId);

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


// 🔥 GET FAVOURITE LIST
exports.getFavouriteList = (req, res) => {

  const userId = req.session.user._id;

  Favourite.getFavourites(userId)
    .then(favourites => {

      const favouriteIds = favourites.map(fav =>
        fav.homeId.toString()
      );

      return Home.fetchAll().then(registeredHomes => {

        const favouriteHomes = registeredHomes.filter(home =>
          favouriteIds.includes(home._id.toString())
        );

        res.render("store/favourites", {
          favouriteHomes,
          PageTitle: "My Favourites",
          cssFile: "favourite"
        });

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

  console.log("Deleting:", homeId, userId); // debug

  Favourite.deleteFavourite(homeId, userId)
    .then(result => {
      console.log("Deleted Count:", result.deletedCount);
      res.redirect("/favourites");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/favourites");
    });
};
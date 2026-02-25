const Favourite = require("../models/Favourites");
const Home = require("../models/home");

// Add to Favourite
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
      console.log("Error adding to favourites:", err);
      res.redirect("/hostels");
    });
};


exports.getFavouriteList = (req, res) => {

  Favourite.getFavourites()
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

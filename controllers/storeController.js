const Home = require("../models/home");
const Favourite = require("../models/Favourites");

// Home Page
exports.getHome = (req, res) => {
  Home.fetchAll()
    .then(homes => {
      res.render("store/home", {
        registeredHomes: homes,
        PageTitle: "Home",
        cssFile: "home"
      });
    })
    .catch(err => console.log(err));
};


// Hostels Page
exports.getHostels = (req, res) => {
  Home.fetchAll()
    .then(homes => {
      res.render("store/hostels", {
        registeredHomes: homes,
        PageTitle: "Hostels",
        cssFile: "hostels"
      });
    })
    .catch(err => console.log(err));
};


// Hostel Detail
exports.getHostelsDetails = (req, res) => {
  Home.findById(req.params.hostelsId)
    .then(home => {

      if (!home) {
        return res.redirect("/hostels");
      }

      res.render("store/hostel-detail", {
        hostels: home,
        PageTitle: "Hostel Detail",
        cssFile: "hostel-detail"
      });

    })
    .catch(err => console.log(err));
};


//  SUCCESS PAGE (VERY IMPORTANT)
exports.getSuccess = (req, res) => {
  res.render("submit-home", {   // make sure file exists
    PageTitle: "Success",
    cssFile: "submit-home"
  });
};

exports.getFavouriteList = (req, res) => {
  Favourite.getFavourites()
    .then(favourites => {
      // Get array of favourite home IDs
      const favouriteIds = favourites.map(fav => fav.houseId.toString());

      // Get all homes
      return Home.fetchAll().then(registeredHomes => {
        const favouriteHomes = registeredHomes.filter(home =>
          favouriteIds.includes(home._id.toString())
        );

        res.render("store/favourite-list", {
          favouriteHomes,
          PageTitle: "My Favourites",
          cssFile: "style"
        });
      });
    })
    .catch(err => console.log("Error fetching favourites: ", err));
};

// POST Add Home to Favourites
exports.postAddToFavourite = (req, res) => {
  const homeId = req.body.homeId; // Must match input name in EJS
  const fav = new Favourite(homeId);

  fav.save()
    .then(() => console.log("✅ Home added to favourites"))
    .catch(err => console.log("Error adding to favourites: ", err))
    .finally(() => res.redirect("/favourites")); // Redirect after POST
};

// POST Remove Home from Favourites
exports.postRemoveFromFavourite = (req, res) => {
  const homeId = req.params.homeId;

  Favourite.deleteById(homeId)
    .then(() => console.log("🔥 Home removed from favourites"))
    .catch(err => console.log("Error removing from favourites: ", err))
    .finally(() => res.redirect("/favourites")); // Redirect after removal
};
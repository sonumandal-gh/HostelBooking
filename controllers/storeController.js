const Home = require("../models/home");
const Favourite = require("../models/Favourites");
const { getDb } = require("../utils/database");

// Home Page
exports.getHome = (req, res) => {
  console.log("Session value: ", req.session);;
  Home.find()
    .then(homes => {
      res.render("store/home", {
        registeredHomes: homes,
        PageTitle: "Home",
        cssFile: "home",
        isLoggedIn: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};


// Hostels Page
exports.getHostels = (req, res) => {
  Home.find()
    .then(homes => {
      res.render("host/hostels", {
        registeredHomes: homes,
        PageTitle: "Hostels",
        cssFile: "hostels",
        isLoggedIn: req.isLoggedIn
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
        cssFile: "hostel-detail",
        isLoggedIn: req.isLoggedIn
      });

    })
    .catch(err => console.log(err));
};


//  SUCCESS PAGE (VERY IMPORTANT)
exports.getSuccess = (req, res) => {
  res.render("submit-home", {   // make sure file exists
    PageTitle: "Success",
    cssFile: "submit-home",
    isLoggedIn: req.isLoggedIn
  });
};

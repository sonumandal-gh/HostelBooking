const Home = require("../models/home");
const Favourite = require("../models/Favourites");
const { getDb } = require("../utils/database");

// Home Page
exports.getHome = async (req, res) => {
  try {
    const homes = await Home.find();
    res.render('store/home', {
      homes: homes,
      PageTitle: "HostelBooking - Best Hostels",
      cssFile: 'home',
      isLoggedIn: req.isLoggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).render('404', {
      PageTitle: "Error",
      isLoggedIn: req.isLoggedIn,
      cssFile: '404'
    });
  }
};


// Hostels Page
exports.getHostels = async (req, res) => {
  try {
    const homes = await Home.find();
    res.render('store/hostels', {
      homes: homes,
      PageTitle: "All Hostels",
      cssFile: 'hostels',
      isLoggedIn: req.isLoggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).render('404', {
      PageTitle: "Error",
      isLoggedIn: req.isLoggedIn,
      cssFile: '404'
    });
  }
};


// Hostel Detail
exports.getHostelsDetails = async (req, res) => {
  try {
    const home = await Home.findById(req.params.hostelsId);
    if (!home) {
      return res.status(404).render('404', {
        PageTitle: "Hostel Not Found",
        isLoggedIn: req.isLoggedIn,
        cssFile: '404'
      });
    }
    res.render('store/hostel-detail', {
      hostels: home,
      home: home,
      PageTitle: home.homeName || "Hostel Detail",
      cssFile: 'hostel-detail',
      isLoggedIn: req.isLoggedIn,
      user: req.session ? req.session.user : null
    });
  } catch (err) {
    console.log(err);
    res.status(500).render('404', {
      PageTitle: "Error",
      isLoggedIn: req.isLoggedIn,
      cssFile: '404'
    });
  }
};


// Success Page
exports.getSuccess = (req, res) => {
  res.render('submit-home', {
    PageTitle: "Success",
    cssFile: 'submit-home',
    isLoggedIn: req.isLoggedIn
  });
};

const Home = require("../models/home");

// GET Add Home Page
exports.getAddHome = (req, res) => {
  res.render("host/Add-Home", {
    PageTitle: "Add Home",
    cssFile: "Add-Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
};


// GET Host Hostels List
exports.getHostHostels = (req, res) => {

  Home.find()
    .then((registeredHomes) => {

      res.render("host/hostels", {
        registeredHomes,
        PageTitle: "Host Homes List",
        cssFile: "hostels",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user
      });

    })
    .catch(err => console.log(err));
};


// POST Add Home
exports.postAddHome = (req, res) => {

  const { homeName, address, city, price, image } = req.body;

  const home = new Home({
    homeName,
    address,
    city,
    price,
    image
  });

  home.save()
    .then(() => {
      console.log("Home Saved Successfully");
      res.redirect("/submit-home");
    })
    .catch(err => console.log(err));
};


// SUCCESS PAGE
exports.getSuccess = (req, res) => {

  res.render("submit-home", {
    PageTitle: "Home Submitted",
    cssFile: "submit-home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });

};


// DELETE HOSTEL
exports.deleteHostel = (req, res) => {

  const hostelId = req.body.hostelId;

  Home.findByIdAndDelete(hostelId)
    .then(() => {

      console.log("Hostel Deleted");

      res.redirect("/host/hostels");

    })
    .catch(err => console.log(err));
};
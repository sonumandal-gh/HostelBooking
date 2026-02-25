const Home = require("../models/home");

// GET Add Home Page
exports.getAddHome = (req, res) => {
  res.render("host/Add-Home", {
    PageTitle: "Add Home",
    cssFile: "Add-Home"
  });
};


// GET Host Hostels List
exports.getHostHostels = (req, res) => {
  Home.fetchAll()
    .then((registeredHomes) => {
      res.render("hostels", {
        registeredHomes,
        PageTitle: "Host Homes List",
        cssFile: "HostHostels"
      });
    })
    .catch(err => console.log(err));
};


//  POST Add Home (VERY IMPORTANT FLOW)
exports.postAddHome = (req, res) => {

  const { homeName, address, city, price, image } = req.body;

  const home = new Home(homeName, address, city, price, image);

  home.save()
    .then(() => {
      console.log("✅ Home Saved Successfully");

      // NEVER render after POST
      res.redirect("/submit-home");
    })
    .catch(err => console.log(err));
};


//  SUCCESS PAGE
exports.getSuccess = (req, res) => {
  res.render("submit-home", {
    PageTitle: "Home Submitted",
    cssFile: "submit-home"
  });
};


//  DELETE HOSTEL
exports.deleteHostel = (req, res) => {

  const hostelId = req.body.hostelId;

  Home.deleteById(hostelId)
    .then(() => {
      console.log(" Hostel Deleted");

      res.redirect("hostels");
    })
    .catch(err => console.log(err));
};
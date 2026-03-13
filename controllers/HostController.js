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
    .catch(err => {
      console.error("Error fetching homes:", err);
      res.status(500).send("Something went wrong!");
    });
};

// POST Add Home
exports.postAddHome = (req, res) => {
  const { homeName, address, city, price } = req.body;
  const image = req.file ? req.file.filename : null; // multer file check

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
    .catch(err => {
      console.error("Error saving home:", err);
      res.status(500).send("Something went wrong!");
    });
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

  if (!hostelId) {
    console.error("No hostelId provided for deletion");
    return res.status(400).send("Bad Request");
  }

  Home.findByIdAndDelete(hostelId)
    .then((deletedHome) => {
      if (!deletedHome) {
        console.warn("Hostel not found for deletion:", hostelId);
        return res.status(404).send("Hostel not found");
      }

      console.log("Hostel Deleted:", deletedHome._id);

      //  Redirect to the correct route
      res.redirect("hostels");
    })
    .catch(err => {
      console.error("Error deleting hostel:", err);
      res.status(500).send("Something went wrong!");
    });
};
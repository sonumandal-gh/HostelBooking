const Home = require("../models/home");

// GET Add Home Page
exports.getAddHome = (req, res) => {
  res.render('host/Add-Home', {
    PageTitle: "Add Hostel",
    cssFile: 'Add-Home',
    isLoggedIn: req.isLoggedIn,
    editing: false
  });
};

// GET Host Hostels List
exports.getHostHostels = async (req, res) => {
  try {
    const registeredHomes = await Home.find();
    res.render('host/host-hostels-list', {
      homes: registeredHomes,
      registeredHomes: registeredHomes,
      PageTitle: "Your Hostels",
      cssFile: 'hostels',
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

// POST Add Home
exports.postAddHome = async (req, res) => {
  const { homeName, address, city, price } = req.body;
  const image = req.file ? req.file.filename : null; // multer file check

  const home = new Home({
    homeName,
    address,
    city,
    price,
    image
  });

  try {
    await home.save();
    res.redirect('/submit-home');
  } catch (err) {
    console.log(err);
    res.status(500).render('404', { 
      PageTitle: "Error", 
      isLoggedIn: req.isLoggedIn, 
      cssFile: '404' 
    });
  }
};

// SUCCESS PAGE
exports.getSuccess = (req, res) => {
  res.render("submit-home", {
    PageTitle: "Home Submitted",
    cssFile: "submit-home",
    isLoggedIn: req.isLoggedIn,
    user: req.session ? req.session.user : null
  });
};

// DELETE HOSTEL
exports.deleteHostel = async (req, res) => {
  const hostelId = req.body.hostelId;

  if (!hostelId) {
    console.error("No hostelId provided for deletion");
    return res.status(400).send("Bad Request");
  }

  try {
    await Home.findByIdAndDelete(hostelId);
    res.redirect('/host/hostels');
  } catch (err) {
    console.log(err);
    res.status(500).render('404', { 
      PageTitle: "Error", 
      isLoggedIn: req.isLoggedIn, 
      cssFile: '404' 
    });
  }
};
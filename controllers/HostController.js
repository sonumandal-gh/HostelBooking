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
      PageTitle: "Your Hostels",
      cssFile: 'hostels', // reusing hostels.css
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


// POST Add Home
exports.postAddHome = async (req, res) => {
  const { homeName, address, city, price, image } = req.body;

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


// DELETE HOSTEL
exports.deleteHostel = async (req, res) => {
  const hostelId = req.body.hostelId;

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
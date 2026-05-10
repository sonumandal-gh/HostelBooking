const Home = require("../models/home");

// GET Add Home Page (Not needed in REST but we can have a generic GET if needed)
// However, in REST we usually just have GET for listings and POST for creation.

// GET All Hostels for the logged-in Host
exports.getHostels = async (req, res) => {
  try {
    const hostels = await Home.find({ host: req.userId });
    res.status(200).json(hostels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fetching hostels failed" });
  }
};

// POST Add Home
exports.postAddHome = async (req, res) => {
  const { homeName, address, city, price } = req.body;
  const image = req.file ? req.file.filename : null; 

  const home = new Home({
    homeName,
    address,
    city,
    price,
    image,
    host: req.userId
  });

  try {
    const savedHome = await home.save();
    res.status(201).json({ message: "Hostel added successfully!", hostel: savedHome });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Adding hostel failed" });
  }
};

// GET Single Hostel for Edit
exports.getHostelForEdit = async (req, res) => {
  const hostelId = req.params.hostelId;
  try {
    const hostel = await Home.findOne({ _id: hostelId, host: req.userId });
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found or unauthorized" });
    }
    res.status(200).json(hostel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fetching hostel failed" });
  }
};

// PUT Update Hostel
exports.putEditHostel = async (req, res) => {
  const hostelId = req.params.hostelId;
  const { homeName, address, city, price } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const hostel = await Home.findOne({ _id: hostelId, host: req.userId });
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found or unauthorized" });
    }

    hostel.homeName = homeName;
    hostel.address = address;
    hostel.city = city;
    hostel.price = price;
    if (image) {
      hostel.image = image;
    }

    await hostel.save();
    res.status(200).json({ message: "Hostel updated successfully!", hostel });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Updating hostel failed" });
  }
};

// DELETE HOSTEL
exports.deleteHostel = async (req, res) => {
  const hostelId = req.params.hostelId;

  if (!hostelId) {
    return res.status(400).json({ message: "No hostelId provided" });
  }

  try {
    const result = await Home.deleteOne({ _id: hostelId, host: req.userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Hostel not found or unauthorized" });
    }
    res.status(200).json({ message: "Hostel deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Deletion failed" });
  }
};

const Home = require("../models/home");

// Fetch All Hostels for the Store
exports.getHostels = async (req, res) => {
  try {
    const homes = await Home.find();
    res.status(200).json(homes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fetching hostels failed" });
  }
};

// Fetch Single Hostel Details
exports.getHostelsDetails = async (req, res) => {
  try {
    const home = await Home.findById(req.params.hostelsId);
    if (!home) {
      return res.status(404).json({ message: "Hostel not found" });
    }
    res.status(200).json(home);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fetching hostel details failed" });
  }
};

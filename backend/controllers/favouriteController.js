const User = require("../models/user");

// Add to Favourites
exports.postAddFavourite = async (req, res) => {
  const { hostelId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user.favourites.includes(hostelId)) {
      user.favourites.push(hostelId);
      await user.save();
    }
    res.status(200).json({ message: "Added to favourites", favourites: user.favourites });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding to favourites" });
  }
};

// Remove from Favourites
exports.postRemoveFavourite = async (req, res) => {
  const { hostelId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    user.favourites = user.favourites.filter(id => id.toString() !== hostelId);
    await user.save();
    res.status(200).json({ message: "Removed from favourites", favourites: user.favourites });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error removing from favourites" });
  }
};

// Get User Favourites
exports.getFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favourites');
    res.status(200).json(user.favourites);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching favourites" });
  }
};
const express = require("express");
const favouriteRouter = express.Router();

const favouriteController = require("../controllers/favouriteController");
const isAuth = require("../middleware/isAuth");

// GET FAVOURITES
favouriteRouter.get(
  "/favourites",
  isAuth,
  favouriteController.getFavouriteList
);

// ADD TO FAVOURITE
favouriteRouter.post(
  "/add-to-favourite",
  isAuth,
  favouriteController.postAddToFavourite
);

// DELETE FAVOURITE
favouriteRouter.post(
  "/favourites/delete/:homeId",
  isAuth,
  favouriteController.postDeleteFavourite
);

module.exports = favouriteRouter;
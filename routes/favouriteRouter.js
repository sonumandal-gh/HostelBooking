const express = require("express");
const favouriteRouter = express.Router();

const favouriteController = require("../controllers/favouriteController");

// GET - Favourite List
favouriteRouter.get("/favourites", favouriteController.getFavouriteList);

// POST - Add to Favourite
favouriteRouter.post("/add-to-favourite", favouriteController.postAddToFavourite);

favouriteRouter.post("/favourites/delete/:homeId", favouriteController.postDeleteFavourite);

module.exports = favouriteRouter;
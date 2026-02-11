const express = require('express');
const storeRouter = express.Router();

const storController = require('../controllers/storeController');

storeRouter.get('/', storController.getHome );
storeRouter.get('/hostels', storController.getHostels );
storeRouter.get('/hostel-detail/:hostelsId',storController.getHostelsDetails);
storeRouter.get('/submit-home', storController.getSuccess);

storeRouter.get("/favourites", storController.getFavouriteList);
storeRouter.post("/favourites/add", storController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", storController.postRemoveFromFavourite);


module.exports = storeRouter;
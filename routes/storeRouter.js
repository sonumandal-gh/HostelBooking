const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/storeController');
const favouriteController = require('../controllers/favouriteController');  

// Home Routes
storeRouter.get('/', storeController.getHome);
storeRouter.get('/hostels', storeController.getHostels);
storeRouter.get('/hostel-detail/:hostelsId', storeController.getHostelsDetails);
storeRouter.get('/submit-home', storeController.getSuccess);

//  FAVOURITES ROUTES 
storeRouter.get('/favourites', favouriteController.getFavouriteList);
storeRouter.post('/add-to-favourite', favouriteController.postAddToFavourite);

module.exports = storeRouter;

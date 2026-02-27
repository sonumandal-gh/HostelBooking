const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/storeController');

// Home Routes
storeRouter.get('/', storeController.getHome);
storeRouter.get('/hostels', storeController.getHostels);
storeRouter.get('/hostel-detail/:hostelsId', storeController.getHostelsDetails);
storeRouter.get('/submit-home', storeController.getSuccess);

module.exports = storeRouter;

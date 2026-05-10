const express = require('express');
const storeRouter = express.Router();
const storeController = require('../controllers/storeController');

// Store Routes relative to /api
storeRouter.get('/hostels', storeController.getHostels);
storeRouter.get('/hostels/:hostelsId', storeController.getHostelsDetails);


module.exports = storeRouter;

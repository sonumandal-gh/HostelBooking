const express = require('express');
const guestRouter = express.Router();
const favouriteController = require('../controllers/favouriteController');
const bookingController = require('../controllers/bookingController');
const isAuth = require('../middleware/isAuth');
const isRole = require('../middleware/isRole');

// All routes here are protected by isAuth and require guest role
guestRouter.use(isAuth, isRole('guest'));


// Favourite Routes
guestRouter.get('/favourites', favouriteController.getFavourites);
guestRouter.post('/favourites/add', favouriteController.postAddFavourite);
guestRouter.post('/favourites/remove', favouriteController.postRemoveFavourite);

// Booking Routes
guestRouter.get('/bookings', bookingController.getBookings);
guestRouter.post('/book', bookingController.postBookHostel);
guestRouter.post('/bookings/cancel', bookingController.postCancelBooking);

module.exports = guestRouter;

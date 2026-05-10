const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../controllers/bookingController");
const isAuth = require("../middleware/isAuth");

bookingRouter.post("/book-now", isAuth, bookingController.postBookNow);
bookingRouter.get("/bookings", isAuth, bookingController.getBookingList);

module.exports = bookingRouter;

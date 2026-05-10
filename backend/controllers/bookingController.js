const Booking = require("../models/booking");

// Create a new booking
exports.postBookHostel = async (req, res) => {
  const { hostelId } = req.body;
  const userId = req.userId;

  try {
    const booking = new Booking({
      userId: userId,
      homeId: hostelId,
      status: 'confirmed'
    });
    await booking.save();
    res.status(201).json({ message: "Hostel booked successfully!", booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Booking failed" });
  }
};

// Get user bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).populate('homeId');
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Cancel booking
exports.postCancelBooking = async (req, res) => {
  const { bookingId } = req.body;
  try {
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cancellation failed" });
  }
};

const Booking = require('../models/Booking');

// Book a service
const bookService = async (req, res) => {
    try {
        const { service, date } = req.body;
        const booking = new Booking({ user: req.user.id, service, date });
        await booking.save();
        res.status(201).json({ message: "Booking successful!", booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bookings for a user
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('service');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        booking.status = req.body.status;
        await booking.save();
        res.status(200).json({ message: "Booking updated!", booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { bookService, getBookings, updateBookingStatus };
//bookingController.js
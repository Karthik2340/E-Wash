const express = require('express');
const { bookService, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, bookService);
router.get('/', protect, getBookings);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
//bookingRoutes.js
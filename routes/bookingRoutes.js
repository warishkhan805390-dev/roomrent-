const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getBookingById, cancelBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { createBookingValidation } = require('../validators/bookingValidator');

router.post('/', protect, createBookingValidation, createBooking);
router.get('/', protect, getUserBookings);
router.get('/all', protect, admin, getAllBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/status', protect, admin, updateBookingStatus);

module.exports = router;

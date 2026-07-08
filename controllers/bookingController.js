const Booking = require('../models/Booking');
const Property = require('../models/Property');
const { validationResult } = require('express-validator');

const createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { property: propertyId, startDate, endDate, guests } = req.body;
  const property = await Property.findById(propertyId);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  if (!property.available) return res.status(400).json({ message: 'Property is not available' });

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start >= end) return res.status(400).json({ message: 'End date must be after start date' });

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const totalPrice = property.rent * days;

  const overlapping = await Booking.findOne({
    property: propertyId,
    status: { $in: ['Pending', 'Confirmed'] },
    $or: [
      { startDate: { $lte: end }, endDate: { $gte: start } },
    ],
  });
  if (overlapping) return res.status(400).json({ message: 'Property is already booked for these dates' });

  const booking = await Booking.create({
    user: req.user._id,
    property: propertyId,
    startDate: start,
    endDate: end,
    guests,
    totalPrice,
  });

  const created = await Booking.findById(booking._id)
    .populate('property', 'title thumbnail rent location')
    .populate('user', 'name email');
  res.status(201).json(created);
};

const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('property', 'title thumbnail rent location roomType')
    .sort({ createdAt: -1 });
  res.json(bookings);
};

const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('property', 'title thumbnail rent location roomType description')
    .populate('user', 'name email phone');
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(booking);
};

const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  if (booking.status !== 'Pending') {
    return res.status(400).json({ message: 'Only pending bookings can be cancelled' });
  }
  booking.status = 'Cancelled';
  const cancelled = await booking.save();
  res.json(cancelled);
};

const getAllBookings = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const query = {};
  if (req.query.status) query.status = req.query.status;

  const total = await Booking.countDocuments(query);
  const bookings = await Booking.find(query)
    .populate('property', 'title thumbnail rent location')
    .populate('user', 'name email phone')
    .skip(skip).limit(limit).sort({ createdAt: -1 });
  res.json({ bookings, page, pages: Math.ceil(total / limit), total });
};

const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = req.body.status || booking.status;
  if (booking.status === 'Confirmed') {
    const property = await Property.findById(booking.property);
    if (property) property.available = false;
    await property.save();
  }
  if (booking.status === 'Cancelled' || booking.status === 'Completed') {
    const property = await Property.findById(booking.property);
    if (property) property.available = true;
    await property.save();
  }
  const updated = await booking.save();
  res.json(updated);
};

module.exports = { createBooking, getUserBookings, getBookingById, cancelBooking, getAllBookings, updateBookingStatus };

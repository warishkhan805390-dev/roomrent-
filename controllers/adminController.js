const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const Review = require('../models/Review');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'admin' }).select('+password');
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id, name: user.name, email: user.email,
      role: user.role, token: require('../utils/generateToken')(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
};

const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProperties = await Property.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalMessages = await Contact.countDocuments({ isRead: false });
  const revenue = await Booking.aggregate([
    { $match: { status: { $in: ['Confirmed', 'Completed'] } } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const propertiesByType = await Property.aggregate([
    { $group: { _id: '$roomType', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  const monthlyBookings = await Booking.aggregate([
    { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 }, revenue: { $sum: '$totalPrice' } } },
    { $sort: { '_id': 1 } },
  ]);

  res.json({
    totalUsers, totalProperties, totalBookings, totalMessages,
    revenue: revenue.length > 0 ? revenue[0].total : 0,
    propertiesByType, monthlyBookings,
  });
};

const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const query = {};
  if (req.query.role) query.role = req.query.role;
  const total = await User.countDocuments(query);
  const users = await User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
  res.json({ users, page, pages: Math.ceil(total / limit), total });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.role === 'admin') return res.status(400).json({ message: 'Cannot delete admin' });
  await Property.deleteMany({ owner: req.params.id });
  await Booking.deleteMany({ user: req.params.id });
  await Review.deleteMany({ user: req.params.id });
  await User.deleteOne({ _id: req.params.id });
  res.json({ message: 'User deleted successfully' });
};

const getAllProperties = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const query = {};
  if (req.query.roomType) query.roomType = req.query.roomType;
  if (req.query.available !== undefined) query.available = req.query.available === 'true';
  const total = await Property.countDocuments(query);
  const properties = await Property.find(query)
    .populate('owner', 'name email')
    .skip(skip).limit(limit).sort({ createdAt: -1 });
  res.json({ properties, page, pages: Math.ceil(total / limit), total });
};

module.exports = { adminLogin, getDashboardStats, getAllUsers, getUserById, deleteUser, getAllProperties };

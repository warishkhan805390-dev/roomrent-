const Property = require('../models/Property');
const Review = require('../models/Review');
const { validationResult } = require('express-validator');

const getProperties = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  const query = {};

  if (req.query.type) query.roomType = req.query.type;
  if (req.query.category) query.category = req.query.category;
  if (req.query.available !== undefined) query.available = req.query.available === 'true';
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { location: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  if (req.query.minRent || req.query.maxRent) {
    query.rent = {};
    if (req.query.minRent) query.rent.$gte = parseFloat(req.query.minRent);
    if (req.query.maxRent) query.rent.$lte = parseFloat(req.query.maxRent);
  }

  const sort = {};
  if (req.query.sortBy === 'rent') sort.rent = req.query.sortOrder === 'desc' ? -1 : 1;
  else if (req.query.sortBy === 'rating') sort.rating = -1;
  else sort.createdAt = -1;

  const total = await Property.countDocuments(query);
  const properties = await Property.find(query)
    .populate('category', 'name')
    .skip(skip).limit(limit).sort(sort);

  res.json({ properties, page, pages: Math.ceil(total / limit), total });
};

const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id).populate('category', 'name');
  if (!property) return res.status(404).json({ message: 'Property not found' });
  const reviews = await Review.find({ property: req.params.id })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });
  res.json({ property, reviews });
};

const getFeaturedProperties = async (req, res) => {
  const properties = await Property.find({ available: true })
    .sort({ rating: -1 }).limit(6);
  res.json(properties);
};

const createProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, thumbnail, images, rent, location, roomType, bedrooms, bathrooms, area, amenities, category } = req.body;
  const property = await Property.create({
    title, description, thumbnail, images, rent, location, roomType,
    bedrooms, bathrooms, area, amenities, category,
    owner: req.user._id,
  });
  const created = await Property.findById(property._id).populate('category', 'name');
  res.status(201).json(created);
};

const updateProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });

  if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const fields = ['title', 'description', 'thumbnail', 'images', 'rent', 'location', 'roomType', 'bedrooms', 'bathrooms', 'area', 'amenities', 'available', 'category'];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) property[f] = req.body[f];
  });

  const updated = await property.save();
  const populated = await Property.findById(updated._id).populate('category', 'name');
  res.json(populated);
};

const deleteProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await Review.deleteMany({ property: req.params.id });
  await Property.deleteOne({ _id: req.params.id });
  res.json({ message: 'Property deleted successfully' });
};

module.exports = { getProperties, getPropertyById, getFeaturedProperties, createProperty, updateProperty, deleteProperty };

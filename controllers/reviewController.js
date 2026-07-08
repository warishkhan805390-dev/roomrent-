const Review = require('../models/Review');
const Property = require('../models/Property');
const { validationResult } = require('express-validator');

const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { property, rating, comment } = req.body;
  const prop = await Property.findById(property);
  if (!prop) return res.status(404).json({ message: 'Property not found' });

  const existing = await Review.findOne({ user: req.user._id, property });
  if (existing) return res.status(400).json({ message: 'You have already reviewed this property' });

  const review = await Review.create({ user: req.user._id, property, rating, comment });

  const reviews = await Review.find({ property });
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  prop.rating = Math.round(avg * 10) / 10;
  prop.numReviews = reviews.length;
  await prop.save();

  const populated = await Review.findById(review._id).populate('user', 'name avatar');
  res.status(201).json(populated);
};

const getPropertyReviews = async (req, res) => {
  const { propertyId } = req.params;
  const prop = await Property.findById(propertyId);
  if (!prop) return res.status(404).json({ message: 'Property not found' });
  const reviews = await Review.find({ property: propertyId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });
  res.json(reviews);
};

const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const propertyId = review.property;
  await Review.deleteOne({ _id: req.params.id });

  const remaining = await Review.find({ property: propertyId });
  const prop = await Property.findById(propertyId);
  if (prop) {
    if (remaining.length > 0) {
      const avg = remaining.reduce((s, r) => s + r.rating, 0) / remaining.length;
      prop.rating = Math.round(avg * 10) / 10;
    } else {
      prop.rating = 0;
    }
    prop.numReviews = remaining.length;
    await prop.save();
  }
  res.json({ message: 'Review deleted successfully' });
};

const updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment !== undefined ? req.body.comment : review.comment;
  const updated = await review.save();

  const reviews = await Review.find({ property: review.property });
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const prop = await Property.findById(review.property);
  if (prop) {
    prop.rating = Math.round(avg * 10) / 10;
    prop.numReviews = reviews.length;
    await prop.save();
  }

  const populated = await Review.findById(updated._id).populate('user', 'name avatar');
  res.json(populated);
};

module.exports = { createReview, getPropertyReviews, deleteReview, updateReview };

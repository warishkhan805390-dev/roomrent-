const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    thumbnail: { type: String, default: '' },
    images: [{ type: String }],
    rent: { type: Number, required: [true, 'Monthly rent is required'], min: 0 },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    roomType: { type: String, required: [true, 'Room type is required'], enum: ['Studio', 'Apartment', 'Single', 'Double', 'Family', 'PG', 'Hostel', 'Villa'] },
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    area: { type: String, required: true },
    amenities: [{ type: String }],
    available: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);

propertySchema.index({ title: 'text', location: 'text', description: 'text' });

module.exports = mongoose.model('Property', propertySchema);

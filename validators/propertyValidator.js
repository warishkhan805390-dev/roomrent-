const { body } = require('express-validator');

const createPropertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('rent').isNumeric().withMessage('Rent must be a number').custom((v) => v > 0).withMessage('Rent must be positive'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('roomType').isIn(['Studio', 'Apartment', 'Single', 'Double', 'Family', 'PG', 'Hostel', 'Villa']).withMessage('Invalid room type'),
  body('bedrooms').isInt({ min: 1 }).withMessage('At least 1 bedroom required'),
  body('bathrooms').isInt({ min: 1 }).withMessage('At least 1 bathroom required'),
  body('area').trim().notEmpty().withMessage('Area is required'),
];

const updatePropertyValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('rent').optional().isNumeric().withMessage('Rent must be a number').custom((v) => v > 0).withMessage('Rent must be positive'),
  body('roomType').optional().isIn(['Studio', 'Apartment', 'Single', 'Double', 'Family', 'PG', 'Hostel', 'Villa']).withMessage('Invalid room type'),
];

module.exports = { createPropertyValidation, updatePropertyValidation };

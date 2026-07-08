const { body } = require('express-validator');

const createReviewValidation = [
  body('property').isMongoId().withMessage('Valid property ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim(),
];

const updateReviewValidation = [
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim(),
];

module.exports = { createReviewValidation, updateReviewValidation };

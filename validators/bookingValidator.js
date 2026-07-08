const { body } = require('express-validator');

const createBookingValidation = [
  body('property').isMongoId().withMessage('Valid property ID is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('guests').isInt({ min: 1 }).withMessage('At least 1 guest required'),
];

module.exports = { createBookingValidation };

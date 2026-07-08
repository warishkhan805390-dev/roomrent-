const express = require('express');
const router = express.Router();
const { getProperties, getPropertyById, getFeaturedProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { createPropertyValidation, updatePropertyValidation } = require('../validators/propertyValidator');

router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', getPropertyById);
router.post('/', protect, createPropertyValidation, createProperty);
router.put('/:id', protect, updatePropertyValidation, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;

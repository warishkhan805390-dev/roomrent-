const express = require('express');
const router = express.Router();
const { adminLogin, getDashboardStats, getAllUsers, getUserById, deleteUser, getAllProperties } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.post('/login', adminLogin);
router.get('/stats', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.get('/users/:id', protect, admin, getUserById);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/properties', protect, admin, getAllProperties);

module.exports = router;

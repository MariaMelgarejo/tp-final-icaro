const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Login user
router.post('/login', authController.login);

// Register a user
router.post('/register', authController.register);

// Admin-Login
router.post('/admin-login', authController.adminLogin);

module.exports = router;
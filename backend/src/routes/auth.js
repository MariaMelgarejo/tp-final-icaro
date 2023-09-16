const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Login user
router.post('/login', authController.login);

// Register a user
router.post('/register', authController.register);

module.exports = router;
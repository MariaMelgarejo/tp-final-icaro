const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Get all users
router.get('/', userController.getUsers);

module.exports = router;
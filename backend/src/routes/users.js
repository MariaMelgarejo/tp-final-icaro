const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Get all users
router.get('/', userController.getUsers);

// Get user by id
router.get('/:id', userController.getUserById);

module.exports = router;
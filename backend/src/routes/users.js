const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { AuthMiddleware, isAdmin } = require('../middlewares/auth');

// Get all users
router.get('/', AuthMiddleware, isAdmin, userController.getUsers);

// Get user by id
router.get('/:id', AuthMiddleware, isAdmin, userController.getUserById);

// Update user
router.put('/:id', AuthMiddleware, userController.updateUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { AuthMiddleware, isAdmin } = require('../middlewares/auth');

// Get all users
router.get('/', AuthMiddleware, isAdmin, userController.getUsers);

// Get all users
router.get('/logged', AuthMiddleware, userController.getLoggedUser);

// Get all clients
router.get('/clients', AuthMiddleware, isAdmin, userController.getClients);

// Get all admins
router.get('/admins', AuthMiddleware, isAdmin, userController.getAdmins);

// Get user by id
router.get('/:id', AuthMiddleware, isAdmin, userController.getUserById);

// Update user
router.put('/:id', AuthMiddleware, userController.updateUser);

// Activate user
router.put('/activate/:id', AuthMiddleware, isAdmin, userController.activateUser);

// Delete user
router.delete('/:id', AuthMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
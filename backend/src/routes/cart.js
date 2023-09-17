const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { AuthMiddleware } = require('../middlewares/auth');

// Create a cart
router.post('/', AuthMiddleware, cartController.createCart);

// Get cart
router.get('/', AuthMiddleware, cartController.getCart);

// Update a cart
router.put('/', AuthMiddleware, cartController.updateCart);

// Delete a cart
router.delete('/', AuthMiddleware, cartController.deleteCart);

module.exports = router;
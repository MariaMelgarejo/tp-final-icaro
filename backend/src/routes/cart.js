const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { AuthMiddleware } = require('../middlewares/auth');

// Create a cart
router.post('/', AuthMiddleware, cartController.createOrUpdateCart);

// Delete a cart item
router.post('/delete-item', AuthMiddleware, cartController.deleteCartItem);

// Get cart
router.get('/', AuthMiddleware, cartController.getCart);

// Delete a cart
router.delete('/', AuthMiddleware, cartController.deleteCart);

module.exports = router;
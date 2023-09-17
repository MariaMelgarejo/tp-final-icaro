const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { AuthMiddleware, isAdmin } = require('../middlewares/auth');

// Create a order
router.post('/', AuthMiddleware, orderController.createOrder);

// Get orders
router.get('/', AuthMiddleware, isAdmin, orderController.getOrders);

// Get order by logged user ID
router.get('/myOrders', AuthMiddleware, orderController.getOrdersByLoggedUserId);

// Get order by ID
router.get('/:id', AuthMiddleware, orderController.getOrder);

// Get order by user ID
router.get('/user/:userId', AuthMiddleware, isAdmin, orderController.getOrdersByUserId);

// Update order status by ID
router.put('/:id', AuthMiddleware, isAdmin, orderController.updateOrderStatus);

module.exports = router;
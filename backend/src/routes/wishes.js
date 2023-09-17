const express = require('express');
const router = express.Router();
const wishController = require('../controllers/wish');
const { AuthMiddleware } = require('../middlewares/auth');

// Update wish
router.put('/', AuthMiddleware, wishController.updateWish);

// Get all wishes by logged user
router.get('/', AuthMiddleware, wishController.getWishesByLoggedUserId);

// Get all wishes by product
router.get('/:productId', AuthMiddleware, wishController.getWishesByProductId);

module.exports = router;
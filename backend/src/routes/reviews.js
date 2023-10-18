const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const { AuthMiddleware } = require('../middlewares/auth');

// Create review
router.post('/', AuthMiddleware, reviewController.createReview);

// Get all reviews by logged user
router.get('/', AuthMiddleware, reviewController.getReviewsByLoggedUserId);

// Get all reviews by product
router.get('/:productId', reviewController.getReviewsByProductId);

// Update a review
router.put('/:id', AuthMiddleware, reviewController.updateReview);

module.exports = router;
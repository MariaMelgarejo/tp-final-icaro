const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { AuthMiddleware, isAdmin } = require('../middlewares/auth');

// Create a category if isAdmin
router.post('/', AuthMiddleware, isAdmin, categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get a category
router.get('/:id', categoryController.getCategory);

// Update a category if isAdmin
router.put('/:id', AuthMiddleware, isAdmin, categoryController.updateCategory);

// Delete a category if isAdmin
router.delete('/:id', AuthMiddleware, isAdmin, categoryController.deleteCategory);

module.exports = router;
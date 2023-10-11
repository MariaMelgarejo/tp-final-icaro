const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { AuthMiddleware, isAdmin } = require('../middlewares/auth');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');

// Create a product if isAdmin
router.post('/', AuthMiddleware, isAdmin, productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get all products
router.get('/rating', productController.getProductsByRating);

// Get all products by category
router.get('/categories/:category', productController.getProductsByCategory);

// Get a product
router.get('/:id', productController.getProduct);

// Update a product if isAdmin
router.put('/:id', AuthMiddleware, isAdmin, productController.updateProduct);

router.put('/upload/:id', AuthMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, productController.uploadImages);

// Delete a product if isAdmin
router.delete('/:id', AuthMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
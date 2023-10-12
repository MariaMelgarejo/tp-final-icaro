const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

const createReview = asyncHandler(async (req, next) => {
    if (req.user.role === 'admin') throw new Error("Los administradores no pueden hacer calificaciones")
    const product = await models.Product.findByPk(req.body.productId)
    if (!product) throw new Error('Producto no encontrado')
    await models.Review.findOrCreate({
        where: {
            userId: req.user.id,
            productId: product.id
        },
        defaults: {
            rating: 0,
            comment: ""
        }
    })
    next
})

// Update review
const updateReview = asyncHandler(async (req, res) => {
    const review = await models.Review.findByPk(req.params.id)
    if (!review) throw new Error('Review no encontrada')
    if (review.userId !== req.user.id) throw new Error('No autorizado')
    const product = await models.Product.findByPk(review.productId)
    if (!product) throw new Error('Producto no encontrado')
    const updatedReview = await review.update(req.body)
    res.status(200).json({
        message: 'Gracias por su calificación!',
        updatedReview
    })
})

// Get all review by logged user
const getReviewsByLoggedUserId = asyncHandler(async (req, res) => {
    const reviews = await models.Review.findAll({
        where: {
            userId: req.user.id
        }
    })
    res.json(reviews)
})

// Get all reviews by product
const getReviewsByProductId = asyncHandler(async (req, res) => {
    const product = await models.Product.findByPk(req.params.productId)
    if (!product) throw new Error('Producto no encontrado')
    const reviews = await models.Review.findAll({
        where: {
            productId: product.id
        },
        include: [
            {
                model: models.User,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
        ]
    })
    res.json(reviews)
})

module.exports = {
    createReview,
    getReviewsByLoggedUserId,
    getReviewsByProductId,
    updateReview
}
const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

const updateWish = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') throw new Error("Los administradores no pueden agregar favoritos")
    const product = await models.Product.findByPk(req.body.productId)
    if (!product) throw new Error('Producto no encontrado')
    const [wish, created] = await models.Wish.findOrCreate({
        where: {
            userId: req.user.id,
            productId: product.id
        }
    })

    if (!created) {
        await wish.destroy()
        return res.status(200).json({
            message: 'Favorito eliminado'
        })
    }

    res.status(201).json({
        message: 'Agregado!'
    })
})

// Get all wishes by logged user
const getWishesByLoggedUserId = asyncHandler(async (req, res) => {
    const wishes = await models.Wish.findAll({
        where: {
            userId: req.user.id
        }
    })

    res.status(200).json(wishes)
})

// Get all wishes by product
const getWishesByProductId = asyncHandler(async (req, res) => {
    const product = await models.Product.findByPk(req.params.productId)
    if (!product) throw new Error('Producto no encontrado')
    const wishes = await models.Wish.findAll({
        where: {
            productId: req.params.productId
        }
    })

    res.status(200).json(wishes)
})

module.exports = {
    updateWish,
    getWishesByLoggedUserId,
    getWishesByProductId
}
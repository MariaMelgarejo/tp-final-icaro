const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

// Get cart products with asyncHandler and response with status
const getCart = asyncHandler(async (req, res) => {
    const cart = await models.Cart.findOne({
        where: {
            userId: req.user.id
        }
    })
    if (!cart) res.status(200).json({ message: 'El carrito no existe' })
    res.status(200).json(cart)
})

// Create or Update cart products with asyncHandler and response with status
const createOrUpdateCart = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') throw new Error("Los administradores no pueden crear carritos")
    let totalPrice = 0;
    const products = JSON.parse(req.body.products)
    products.forEach(product => {
        totalPrice += product.price * product.quantity
    })
    const [cart, created] = await models.Cart.findOrCreate({
        where: {
            userId: req.user.id
        },
        defaults: {
            products: req.body.products,
            totalPrice: totalPrice
        }
    })

    if (!created) {
        cart.products = req.body.products
        cart.totalPrice = totalPrice
        await cart.save()
        res.status(200).json({
            message: 'Carrito actualizado',
            cart
        })
    }

    res.status(201).json({
        message: 'Carrito actualizado',
        cart
    })
})

// Delete cart products with asyncHandler and response with status
const deleteCart = asyncHandler(async (req, res) => {
    const cart = await models.Cart.findOne({
        where: {
            userId: req.user.id
        }
    })
    if (!cart) throw new Error('El carrito no existe')
    await cart.destroy()

    res.status(200).json({ message: 'Carrito borrado' })
})

module.exports = {
    getCart,
    createOrUpdateCart,
    deleteCart
}
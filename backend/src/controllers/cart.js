const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

// Create a cart products with asyncHandler and response with status
const createCart = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') throw new Error("Los administradores no pueden crear carritos")
    const cart = await models.Cart.findOne({
        where: {
            userId: req.user.id
        }
    })
    if (cart) throw new Error('El usuario ya posee un carrito')
    const newCart = await models.Cart.create({
        userId: req.user.id,
        products: req.body.products
    })

    res.status(201).json(newCart)
})

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

// Update cart products with asyncHandler and response with status
const updateCart = asyncHandler(async (req, res) => {
    const cart = await models.Cart.findOne({
        where: {
            userId: req.user.id
        }
    })
    if (!cart) throw new Error('El carrito no existe')
    cart.products = req.body.products
    await cart.save()

    res.status(200).json(cart)
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
    createCart,
    getCart,
    updateCart,
    deleteCart
}
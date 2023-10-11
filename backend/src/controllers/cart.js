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
    const product = [req.body]
    const [cart, created] = await models.Cart.findOrCreate({
        where: {
            userId: req.user.id
        },
        defaults: {
            products: JSON.stringify(product),
            totalPrice: product[0].price * product[0].quantity
        }
    })

    if (!created) {
        let productsCart = JSON.parse(cart.products)
        const exist = productsCart.find(({ id }) => id === req.body.id);
        if (exist) {
            productsCart.forEach(product => {
                if (product.id === req.body.id) {
                    product.quantity = parseInt(product.quantity) + parseInt(req.body.quantity)
                }
            }
            )
        } else {
            productsCart.push(req.body)
        }
        cart.products = JSON.stringify(productsCart)
        cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(product[0].price) * parseInt(product[0].quantity)
        cart.save()
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

// Delete cart item with asyncHandler and response with status
const deleteCartItem = asyncHandler(async (req, res) => {
    const cart = await models.Cart.findOne({
        where: {
            userId: req.user.id
        }
    }
    )
    if (!cart) throw new Error('El carrito no existe')
    const productsCart = JSON.parse(cart.products)
    const newProductsCart = productsCart.filter(product => product.id !== req.body.id);
    cart.products = JSON.stringify(newProductsCart)
    cart.totalPrice = parseFloat(cart.totalPrice) - parseFloat(req.body.price) * parseInt(req.body.quantity)
    cart.save()
    res.status(200).json({
        message: 'Producto eliminado del carrito',
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

    res.status(200).json({ message: 'El carrito se encuentra vacio' })
})

module.exports = {
    getCart,
    createOrUpdateCart,
    deleteCart,
    deleteCartItem
}
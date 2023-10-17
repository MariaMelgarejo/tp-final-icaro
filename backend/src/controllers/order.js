const models = require('../db/models/index');
const reviewController = require('./review');
const asyncHandler = require('express-async-handler')

// Create a order with asyncHandler for user logged
const createOrder = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') throw new Error("Los administradores no pueden crear ordenes")
    try {
        const products = JSON.parse(req.body.products)
        await products.map(async product => {
            reviewController.createReview({ user: req.user, body: { productId: product.id } })
            let prod = await models.Product.findByPk(product.id)
            prod.stock = prod.stock - parseInt(product.quantity)
            await prod.save()
        })

        const order = await models.Order.create({
            userId: req.user.id,
            products: req.body.products,
            total: req.body.total
        })

        await models.Shipping.create({
            orderId: order.id,
            street: req.body.street,
            number: req.body.number,
            apartment: req.body.apartment,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            zipcode: req.body.zipcode
        })

        res.status(201).json({
            message: 'Orden creada',
        })
    } catch (error) {
        throw new Error('No se pudo crear la orden')
    }
})

// Get all orders
const getOrders = asyncHandler(async (req, res) => {
    const orders = await models.Order.findAll({
        order: [['createdAt', 'DESC']], attributes: { exclude: ['userId', 'updatedAt'] },
        include: [
            {
                model: models.User,
                attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Shipping,
                attributes: { exclude: ['id', 'orderId', 'createdAt', 'updatedAt'] }
            }
        ]
    })

    res.status(200).json(orders)
})

// Get order by ID
const getOrder = asyncHandler(async (req, res) => {
    const order = await models.Order.findByPk(req.params.id, {
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                model: models.User,
                attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Shipping,
                attributes: { exclude: ['id', 'orderId', 'createdAt', 'updatedAt'] }
            }
        ]
    })

    if (!order) throw new Error('La orden no existe')
    if (order.userId !== req.user.id && req.user.role !== 'admin') throw new Error("No posee permisos para esta acción")

    res.status(200).json({
        order
    })
})

// Get all orders by userId
const getOrdersByLoggedUserId = asyncHandler(async (req, res) => {
    const orders = await models.Order.findAll({
        where: {
            userId: req.user.id
        },
        attributes: { exclude: ['userId', 'updatedAt'] },
        include: [
            {
                model: models.User,
                attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Shipping,
                attributes: { exclude: ['id', 'orderId', 'createdAt', 'updatedAt'] }
            }
        ]
    })

    res.status(200).json({
        orders
    })
})

// Get all orders by userId
const getOrdersByUserId = asyncHandler(async (req, res) => {
    const orders = await models.Order.findAll({
        where: {
            userId: req.params.userId
        },
        attributes: { exclude: ['userId', 'updatedAt'] },
        include: [
            {
                model: models.User,
                attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Shipping,
                attributes: { exclude: ['id', 'orderId', 'createdAt', 'updatedAt'] }
            }
        ]
    })

    res.status(200).json({
        orders
    })
})

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await models.Order.findByPk(req.params.id)

    if (!order) throw new Error('La orden no existe')

    order.status = req.body.status

    await order.save()

    res.status(200).json({
        order
    })
})

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    getOrdersByLoggedUserId,
    getOrdersByUserId,
    updateOrderStatus
}

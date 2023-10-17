const Op = require('sequelize').Op;
const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')
const cloudinaryUploadImg = require('../utils/cloudinary')
const paginate = require('../utils/paginate')
const fs = require('fs')

// Create product with asyncHandler and valid category
const createProduct = asyncHandler(async (req, res) => {
    const category = await models.Category.findByPk(req.body.categoryId)
    if (!category) throw new Error('La categoría no existe')
    const uploader = (path) => cloudinaryUploadImg(path, 'images')
    const file = req.files[0]
    const newPath = await uploader(file.path)
    req.body.image = newPath.url
    console.log('req.body', req.body)
    fs.unlinkSync(file.path)

    const product = await models.Product.create(req.body)
    res.status(201).json(
        {
            message: 'Product creado',
            product
        })
})

// Get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await models.Product.findAll({
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                model: models.Category,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Wish,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
        ]
    })
    res.status(200).json(products)
})

// Get all active products with pagination
const getProductsWithPagination = asyncHandler(async (req, res) => {
    try {
        // get query params
        const { q, page, limit, order_by, order_direction } = req.query;
        console.log('page', page)
        console.log('limit', limit)

        let search = {};
        let order = []

        // add search term to the search object
        if (q) {
            search = {
                where:
                    { title: { [Op.like]: `%${q}%` } }
            }
        }

        // add the order params to the order array
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }

        // transform function that can be passed to the paginate method
        const transform = (products) => {
            return products.map((product) => {
                return {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    discount: product.discount,
                    image: product.image,
                    active: product.active,
                    Category: product.Category,
                    Wish: product.Wish,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                }
            })
        }

        // associations
        const associations = [
            {
                model: models.Category,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Wish,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
        ]

        // paginate method that takes model, page, limit, search object, order and transform
        const products = await paginate(models.Product, associations, page, limit, search, order, transform)

        return res.status(200).json({
            success: true,
            message: 'Fetched products',
            data: products
        })
    } catch (error) {
        throw new Error('Error al obtener los productos')
    }
})

// Get all products by category title with asyncHandler
const getProductsByCategory = asyncHandler(async (req, res) => {
    const category = await models.Category.findOne({
        where: {
            title: req.params.category
        }
    })
    const products = await models.Product.findAll({
        where: { categoryId: category.id },
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                model: models.Category,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Wish,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
        ]
    }
    )
    res.status(200).json(products)
})

// Get all products by rating
const getProductsByRating = asyncHandler(async (req, res) => {
    const products = await models.Product.findAll({
        order: [['rating', 'DESC']], attributes: { exclude: ['updatedAt'] },
        include: [
            {
                model: models.Category,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
        ]
    })
    res.status(200).json(products)
})

// Get product by id
const getProduct = asyncHandler(async (req, res) => {
    const product = await models.Product.findByPk(req.params?.id, {
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                model: models.Category,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Review,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Wish,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            },
        ]
    })
    if (!product) throw new Error('El producto no existe')
    res.status(200).json(product)
})

// Update product by id
const updateProduct = asyncHandler(async (req, res) => {
    const product = await models.Product.findByPk(req.params.id, { attributes: { exclude: ['updatedAt'] } })
    if (req.body.categoryId) {
        const category = await models.Category.findByPk(req.body.categoryId)
        if (!category) throw new Error('La categoría no existe')
    }
    if (!product) throw new Error('El producto no existe')

    product.title = req.body.title ?? product.title
    product.description = req.body.description ?? product.description
    product.price = req.body.price ?? product.price
    product.categoryId = req.body.categoryId ?? product.categoryId
    product.image = req.body.image ?? product.image
    product.stock = req.body.stock ?? product.stock
    product.discount = req.body.discount ?? product.discount
    product.active = req.body.active ?? product.active

    await product.save()
    res.status(200).json({ message: 'Producto Actualizado!', product })
})

// Delete product by id
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await models.Product.findByPk(req.params.id)
    if (!product) throw new Error('El producto no existe')

    await product.destroy()
    res.status(200).json({ message: 'Producto borrado' })
})

module.exports = {
    createProduct,
    getProducts,
    getProductsByRating,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsWithPagination
}
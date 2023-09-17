const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

// Create a category with asyncHandler
const createCategory = asyncHandler(async (req, res) => {
    try {
        const { title } = req.body
        const category = await models.Category.create({ title })
        res.status(201).json(
            {
                message: 'Categoría creada',
                category
            })
    } catch (error) {
        throw new Error('La categoría no se pudo crear')
    }

})

// Get all categories
const getCategories = asyncHandler(async (req, res) => {
    const categories = await models.Category.findAll({ attributes: { exclude: ['updatedAt'] } })
    res.status(200).json(categories)
})

// Get category by ID
const getCategory = async (req, res) => {
    const category = await models.Category.findByPk(req.params?.id, { attributes: { exclude: ['updatedAt'] } })
    res.status(200).json(category)
}

// Update category by ID
const updateCategory = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        const category = await models.Category.findByPk(req.params?.id)
        if (category) {
            // const { title } = req.body
            await category.update(req.body)
            res.status(200).json({ message: 'Categoría Actualizada!', category })
        } else {
            res.status(404).json({ message: 'La categoría no existe' })
        }
    } catch (error) {
        throw new Error('La categoría no se pudo actualizar')
    }
})

// Delete category by ID
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await models.Category.findByPk(req.params?.id)
        if (category) {
            await category.destroy()
            res.status(200).json({ message: 'Categoría Eliminada' })
        } else {
            res.status(404).json({ message: 'La categoría no existe' })
        }
    } catch (error) {
        throw new Error('La categoría no se pudo eliminar')
    }
})
module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}

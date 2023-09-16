const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await models.User.findAll({
        attributes: { exclude: ['password', 'updatedAt'] },
        include: [
            {
                model: models.Address,
                attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Contact,
                attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
            },
        ]
    })
    res.status(200).json(users);
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    const user = await models.User.findByPk(req.params.id, {
        attributes: { exclude: ['password', 'updatedAt'] },
        include: [
            {
                model: models.Address,
                attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
            },
            {
                model: models.Contact,
                attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
            },
        ]
    });
    res.status(200).json(user);
});

module.exports = {
    getUsers,
    getUserById
}
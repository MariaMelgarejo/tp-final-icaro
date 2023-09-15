const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

// Get all users
const getUsers = async (req, res) => {
    const users = await models.User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })
    res.status(200).json(users);
};

module.exports = {
    getUsers,
}
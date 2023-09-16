const models = require('../db/models/index');
const asyncHandler = require('express-async-handler')

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await models.User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
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

module.exports = {
    getUsers,
}
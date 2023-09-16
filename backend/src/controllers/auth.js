const models = require('../db/models/index');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken');

// Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await models.User.findOne({
        where: { email: email },
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
    });

    if (!user) throw new Error('Invalid credentials');

    const userPassword = await models.User.findByPk(user.id, { attributes: ['password'] });

    const isMatch = await bcrypt.compare(password, userPassword.password);
    if (!isMatch) throw new Error('Invalid credentials');

    res.status(200).json({
        message: 'Login successful',
        user,
        token: generateToken(user.id)
    });
})

module.exports = {
    login,
}
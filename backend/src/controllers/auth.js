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

    if (!user) throw new Error('El usuario no existe');

    const userPassword = await models.User.findByPk(user.id, { attributes: ['password'] });

    const isMatch = await bcrypt.compare(password, userPassword.password);
    if (!isMatch) throw new Error('Contraseña Incorrecta');

    res.status(200).json({
        message: 'Login successful',
        user,
        token: generateToken(user.id)
    });
})

// Register User
const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, role, password, mobile, phone, instagram_url, address } = req.body;
    const { street, number, apartment, city, province, country, zipcode } = address;

    const userExists = await models.User.findOne({ where: { email: email } });
    if (userExists) {
        throw new Error('El usuario ya existe');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await models.User.create({
            firstname,
            lastname,
            email,
            role,
            password: hashedPassword,
            active: true
        });

        newUser.createAddress({
            street,
            number,
            apartment,
            city,
            province,
            country,
            zipcode,
        });

        newUser.createContact({
            mobile,
            phone,
            instagram_url
        });

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
})

// Admin Login
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await models.User.findOne({
        where: { email: email },
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

    if (!user) throw new Error('El usuario no existe');
    if (user.role !== 'admin') throw new Error('No posee permisos de Administrador');

    const userPassword = await models.User.findByPk(user.id, { attributes: ['password'] });

    const isMatch = await bcrypt.compare(password, userPassword.password);
    if (!isMatch) throw new Error('Invalid credentials');

    res.json({
        message: 'Login successful',
        user,
        token: generateToken(user.id)
    });
})

module.exports = {
    login,
    register,
    adminLogin
}
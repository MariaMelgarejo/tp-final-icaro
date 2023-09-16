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


// Update a user
const updateUser = asyncHandler(async (req, res) => {
    const user = await models.User.findByPk(req.params.id);

    if (!user) throw new Error('El usuario no existe');

    const { firstname, lastname, email, password, role, mobile, phone, instagramUrl, address, active } = req.body;
    const { street, number, apartment, city, province, country, zipcode } = address

    let hashedPassword
    if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }

    const userContact = await user.getContact()
    const userAddress = await user.getAddress()

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    password ? user.password = hashedPassword : null;
    user.role = role || user.role;
    user.active = active || user.active;

    const updateAddress = {

        street: street || userAddress.street,
        number: number || userAddress.number,
        apartment: apartment || userAddress.apartment,
        city: city || userAddress.city,
        province: province || userAddress.province,
        country: country || userAddress.country,
        zipcode: zipcode || userAddress.zipcode
    }

    const updateContact = {
        mobile: mobile || userContact.mobile,
        phone: phone || userContact.phone,
        instagramUrl: instagramUrl || userContact.instagramUrl
    };

    try {
        await user.save();
        await userContact.update(updateContact)
        await userAddress.update(updateAddress)

        const userUpdated = await models.User.findByPk(req.params.id, {
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
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

module.exports = {
    getUsers,
    getUserById,
    updateUser
}
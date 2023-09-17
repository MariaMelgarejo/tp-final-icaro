const models = require('../db/models');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const AuthMiddleware = asyncHandler(async (req, res, next) => {
    if (!req.header('Authorization') || !req.header('Authorization').startsWith('Bearer')) throw new Error('No token, authorization denied');

    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) throw new Error('No token, authorization denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await models.User.findByPk(decoded.id);
        next();
    } catch (error) {
        throw new Error('Token is not valid. Please login again');
    }
});

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: "You're not authorized to perform this action" });
    }
    next();
}

// export middleware
module.exports = { AuthMiddleware, isAdmin };
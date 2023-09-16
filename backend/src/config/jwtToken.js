const jwt = require('jsonwebtoken');
console.log(process.env.JWT_SECRET);
console.log(process.env.JWT_EXPIRES_IN);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};


module.exports = {
    generateToken
};
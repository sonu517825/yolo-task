const jwt = require('jsonwebtoken');
const HttpError = require('../error/Http_error')

const GenerateToken = async (obj = {}) => {
    try {
        let access_token = jwt.sign(obj, process.env.JWT_SECRET_KEY, {
            expiresIn: '30m'
        });
        return access_token;
    } catch (error) {
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

const DecodeToken = async (token) => {
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return decode;
    } catch (error) {
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

module.exports = { GenerateToken, DecodeToken }
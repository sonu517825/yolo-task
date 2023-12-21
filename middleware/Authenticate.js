const Security = require('../security/Token')
const CustomerSchema = require('../schemas/UserSchema')
const HttpError = require('../error/Http_error')

const Authenticate = async (req, res, next) => {
    try {
        const bearerToken = req.headers["authorization"];

        if (typeof bearerToken == "undefined" || !bearerToken) {
            throw new HttpError("Authorization Header not found", 404)
        }

        const token = bearerToken?.split(" ")?.[1]

        if (typeof token == "undefined" || !token) {
            throw new HttpError("Bearer Token not found", 404)
        }

        const decode = await Security.DecodeToken(token || "")
        const check = await CustomerSchema.findOne({ username: decode.username })

        if (!check) {
            throw new HttpError("Authorization Failed", 404)
        }

        if (check.login !== token) {
            throw new HttpError("you are logout", 400)
        }

        req.auth = check
        next()
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong.",
            success: false
        });
    }
};


module.exports = {
    Authenticate,
}
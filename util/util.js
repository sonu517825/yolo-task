const HttpError = require('../error/Http_error')

const ValidateEmail = async (email = "") => {
    try {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new HttpError("Invalid email address.", 400)
        }

        return true

    } catch (error) {
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};


const ValidatePhone = async (phone = "", otp) => {
    try {
 
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            throw new HttpError("Invalid phone number", 400);
        }
      
        return true

    } catch (error) {
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};


module.exports = {
    ValidateEmail,
    ValidatePhone
}
const HttpError = require('../error/Http_error')
const UserSchema = require('../schemas/UserSchema')
const Security = require('../security/Token')
const Util = require('../util/util')

const Signup = async (body = {}) => {
    try {

        if (!('username' in body) || !('password' in body)) {
            throw new HttpError("Invalid payload.", 400)
        }

        const check = await UserSchema.findOne({ username: body?.username || "" })

        if (check) {
            throw new HttpError("Username already taken", 400)
        }

        const signup = {}
        signup['username'] = body?.['username'] || "no username"
        signup['password'] = body?.['password'] || "no password"

        const save = await UserSchema.create(signup)

        return {
            username: save['username'],
            password: save['password'],
            success: true
        }
    } catch (error) {
        console.error("error  :  ", error);
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

const Login = async (body = {}) => {
    try {

        if (!('username' in body) || !('password' in body)) {
            throw new HttpError("Invalid payload.", 400)
        }

        const check = await UserSchema.findOne({ username: body?.username || "", password: body?.password || "" })

        if (!check) {
            throw new HttpError("Incorrect username or password", 400)
        }

        if (check.login !== "" && !body?.force) {
            throw new HttpError("Somebody already login from somewhere. Give force true for forcefully login.", 400)
        }

        const token_payload = {
            username: check?.username || "",
            timestamps: new Date().getTime()
        }

        const token = await Security.GenerateToken(token_payload)
        const resp = { username: check.username, token, timestamps: new Date().getTime() }
        await UserSchema.findOneAndUpdate({ username: check?.username || "" }, { $set: { login: token } }, { new: true, useFindAndModify: false })

        return resp
    } catch (error) {
        console.error("error  :  ", error);
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

const Logout = async (auth = {}) => {
    try {

        await UserSchema.findOneAndUpdate({ username: auth?.username || "" }, { $set: { login: "" } }, { new: true, useFindAndModify: false })

        return 'logout'
    } catch (error) {
        console.error("error  :  ", error);
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

const Profile = async (auth = {}) => {
    try {

        auth = JSON.parse(JSON.stringify(auth))

        delete auth.login
        delete auth.__v
        delete auth._id
        delete auth.updatedAt

        return auth

    } catch (error) {
        console.error("error  :  ", error);
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

const Update = async (body = {}, auth = {}) => {
    try {

        const update = {}

        update['name'] = body?.['name'] || auth?.name || ""
        update['address'] = body?.['address'] || auth?.address || ""

        if ('email' in body) {
            const check = await Util.ValidateEmail(body?.['email'] || "")
            if (check) {
                update['email'] = body?.['email']
            } else {
                update['email'] = auth?.email || ""
            }
        }

        if ('phone' in body) {
            const check = await Util.ValidatePhone(body?.['phone'] || "")
            if (check) {
                update['phone'] = body?.['phone']
            } else {
                update['phone'] = auth?.phone || ""
            }
        }

        await UserSchema.findOneAndUpdate({ username: auth?.username || "" }, { $set: update }, { new: true, useFindAndModify: false })

        return 'profile updated'
    } catch (error) {
        console.error("error  :  ", error);
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

const ResetUsername = async (body = {}, auth = {}) => {
    try {

        if (!('username' in body) || body.username == "") {
            throw new HttpError("Invalid payload.", 400)
        }

        const check = await UserSchema.findOne({ username: body?.username || "" })

        if (check) {
            throw new HttpError("Username already taken", 400)
        }

        await UserSchema.findOneAndUpdate({ username: auth?.username || "" }, { $set: { username: body?.username || "" } }, { new: true, useFindAndModify: false })

        return 'username reset'
    } catch (error) {
        console.error("error  :  ", error);
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

const Delete = async (auth = {}) => {
    try {

        await UserSchema.findOneAndDelete({ username: auth?.username || "" })

        return 'Your account is deleted'

    } catch (error) {
        console.error("error  :  ", error);
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

module.exports = {
    Signup,
    Login,
    Logout,
    Profile,
    Update,
    ResetUsername,
    Delete
}
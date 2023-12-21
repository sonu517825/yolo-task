const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
            trim: true,
            default: ""
        },
        email: {
            type: String,
            required: false,
            trim: true,
            lowercase: true,
            default: ""
        },
        phone: {
            type: String,
            required: false,
            trim: true,
            default: ""
        },
        password: {
            type: String,
            required: true,
            trim: true,
            default: "no password"
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            default: "no username"
        },
        address: {
            type: String,
            required: false,
            trim: true,
            default: ""
        },
        login: {
            type: String,
            required: false,
            trim: true,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);

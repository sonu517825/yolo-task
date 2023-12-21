
const UserModel = require('../models/UserModel')

const Signup = async (req, res, next) => {
  try {
    const body = req?.body || {}
    const signup = await UserModel.Signup(body)
    return res.status(201).json({
      message: signup,
      success: true
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
      success: false
    });
  }
};

const Login = async (req, res, next) => {
  try {
    const body = req?.body || {}
    const login = await UserModel.Login(body)
    return res.status(200).json({
      message: login,
      success: true
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
      success: false
    });
  }
};

const Logout = async (req, res, next) => {
  try {
    const auth = req.auth || {}
    const logout = await UserModel.Logout(auth)
    return res.status(200).json({
      message: logout,
      success: true
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
      success: false
    });
  }
};

const Profile = async (req, res, next) => {
  try {
    const auth = req.auth || {}
    const profile = await UserModel.Profile(auth)
    return res.status(200).json({
      message: profile,
      success: true
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
      success: false
    });
  }
};

const Update = async (req, res, next) => {
  try {
    const body = req?.body || {}
    const auth = req.auth || {}
    const update = await UserModel.Update(body, auth)
    return res.status(200).json({
      message: update,
      success: true
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
      success: false
    });
  }
};

const ResetUsername = async (req, res, next) => {
  try {
    const body = req?.body || {}
    const auth = req.auth || {}
    const resetUsername = await UserModel.ResetUsername(body, auth)
    return res.status(200).json({
      message: resetUsername,
      success: true
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
      success: false
    });
  }
};

const Delete = async (req, res, next) => {
  try {
    const auth = req.auth || {}
    const _delete = await UserModel.Delete(auth)
    return res.status(200).json({
      message: _delete
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
      success: false
    });
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


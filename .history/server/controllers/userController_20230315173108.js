const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

//@desc Register user
//@route POST /api/users/register
//@access Private
const registerUser = async (req, res) => {
  res.json({
    message: 'User Registered'
  })
}


//@desc Authenticate a User
//@route POST /api/users/login
//@access Private
const loginUser = async (req, res) => {
  res.json({
    message: 'User Logged In'
  })
}


//@desc Get User Data
//@route GET /api/users/me
//@access Private
const getMe = async (req, res) => {
  res.json({
    message: 'User Data Display'
  })
}


module.exports = {
  registerUser,
  loginUser,
  getMe
}

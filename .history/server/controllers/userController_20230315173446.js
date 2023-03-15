const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

//@desc Register user
//@route POST /api/users/register
//@access Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new Error('Please fill all fields')


  res.json({
    message: 'User Registered'
  })
})


//@desc Authenticate a User
//@route POST /api/users/login
//@access Private
const loginUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'User Logged In'
  })
})


//@desc Get User Data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  res.json({
    message: 'User Data Display'
  })
})


module.exports = {
  registerUser,
  loginUser,
  getMe
}

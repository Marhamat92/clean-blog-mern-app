const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { registerUser, loginUser, getMe } = require('../controllers/userController')

//!Register user
router.post('/register', registerUser)
//!login user
router.post('/login', loginUser)
//!Get user details
router.get('/me', getMe)



module.exports = router

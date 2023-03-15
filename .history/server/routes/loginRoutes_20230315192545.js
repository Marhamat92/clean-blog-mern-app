const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

//!Register user
router.post('/register', registerUser)
//!login user
router.post('/login', loginUser)
//!Get user details
router.get('/me', protect, getMe)



module.exports = router

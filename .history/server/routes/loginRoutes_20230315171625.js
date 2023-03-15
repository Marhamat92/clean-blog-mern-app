const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { registerUser, loginUser } = require('../controllers/userController')

//!Register user
router.post('/register', registerUser)
//!login user
router.post('/login', loginUser)



module.exports = router

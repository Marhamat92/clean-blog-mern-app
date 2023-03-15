const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { registerUser } = require('../controllers/userController')

//!register user
router.post('/register', registerUser)



module.exports = router

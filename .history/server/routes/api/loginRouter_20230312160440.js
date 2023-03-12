const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../models/User')

//!register route
router.post('/register', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Password and email are required' })
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ msg: 'Password must be at least 8 characters' })
  }
  const user = await User.findOne({ email: req.body.email }) //finding user by email in database and storing it in user variable to see if it exists
  if (user) return res.status(400).json({ msg: 'User already exists' })
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  })


  //hashing password
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err)
      return res.status(400).json({ msg: 'Error while saving password' });
    newUser.password = hash;
    const savedUser = await newUser.save();

    if (savedUser) return res.status(200).json({ msg: 'User registered successfully' })
  })
})


//!login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' })
  }
  const user = await User.findOne({ email: email }) //finding user by email in database and storing it in user variable to see if it exists
  if (!user) return res.status(400).json({ msg: 'User does not exist' });

  const matchedPassword = await bcrypt.compare(password, user.password)
  if (matchedPassword) {
    const userSession = { email: user.email } //creating user session to keep user loggedin also on refresh

    req.session.user = userSession; //attach user session to session object from express-session
    return res.status(200).json({ msg: 'User logged in successfully', userSession })
  } else {
    return res.status(400).json({ msg: 'Incorrect password' })
  };
})


//create isAuth router middleware to check if user is logged in and add name beside email
router.get('/auth', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user)
  } else {
    return res.status(401).json('No user logged in')
  }
})




//!logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: 'Error while logging out' })
    }
    return res.status(200).json({ msg: 'User logged out successfully' })
  })
})



//!list all users
router.get('/list', async (req, res) => {
  const users = await User.find()
  if (users) {
    return res.status(200).json(users)
  } else {
    return res.status(400).json({ msg: 'No users found' })
  }
})










module.exports = router
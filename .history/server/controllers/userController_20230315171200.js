//@desc create user
//@route POST /api/users/register
//@access Private
const registerUser = (req, res) => {
  res.json({
    message: 'User Registered'
  })
}

module.exports = {
  registerUser,
}

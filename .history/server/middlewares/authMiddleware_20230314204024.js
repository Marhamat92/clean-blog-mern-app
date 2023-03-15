import User from '../models/User'
import jwt from 'jsonwebtoken'

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]


  if (token == null) return res.status(401).json({ msg: 'No token provided' })

  req.user = await User.findById(
    jwt.verify(token, process.env.JWT_SECRET).userId
  )

  next()
}

export { authenticateToken }
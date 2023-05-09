import { config } from 'dotenv'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bycript from 'bcryptjs'
import User from '../models/User.js'

config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const loginUser = async (req, res) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.status(401).json({ fieldsErrors: result.mapped() })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      return res
        .status(401)
        .json({ error: 'User not registered with this email' })
    }

    const isMatch = await bycript.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Email and/or password invalid' })
    }

    const userData = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname
    }

    // JWT
    const jwtToken = jwt.sign(userData, JWT_SECRET_KEY, {
      expiresIn: '7d'
    })

    return res
      .status(200)
      .json({ msg: 'Login successfully', token: jwtToken, user: userData })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const registerUser = async (req, res) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.status(401).json({ fieldsErrors: result.mapped() })
  }

  const { email, password, fullname } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      return res.status(401).json({ error: 'User is already registered' })
    }

    const passwordHashed = await bycript.hash(password, bycript.genSaltSync(12))

    const newUser = await User.create({
      email,
      password: passwordHashed,
      fullname
    })

    const userData = {
      userId: newUser.id,
      email: newUser.email,
      fullname: newUser.fullname
    }

    // JWT
    const jwtToken = jwt.sign(userData, JWT_SECRET_KEY, {
      expiresIn: '7d'
    })

    return res.status(200).json({
      msg: 'Successfully registered user',
      token: jwtToken,
      user: userData
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const validateToken = async (req, res) => {
  const token = req.cookies['jwt_token']

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const tokenDecoded = jwt.verify(token, JWT_SECRET_KEY)

    const user = await User.findByPk(tokenDecoded.userId, {
      attributes: ['id', 'email', 'fullname']
    })

    return res.status(200).json({ msg: 'Token is valid!', user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

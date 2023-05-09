import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({
    min: 6
  })
]

export const registerValidation = [
  ...loginValidation,
  body('fullname', 'Enter a fullname').exists().notEmpty()
]

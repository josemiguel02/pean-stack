import { Router } from 'express'
import {
  loginUser,
  registerUser,
  validateToken
} from '../controllers/auth.controller.js'
import { loginValidation, registerValidation } from '../validations.js'

const router = Router()

router.post('/login', loginValidation, loginUser)
router.post('/register', registerValidation, registerUser)
router.get('/validate-token', validateToken)

export default router

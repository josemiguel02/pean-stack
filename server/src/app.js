import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import CookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import HomeRoutes from './routes/home.routes.js'
import AuthRoutes from './routes/auth.routes.js'
import ClientsRoutes from './routes/client.routes.js'
import DepartmentsRoutes from './routes/departments.routes.js'

const app = express()
dotenv.config()

// Config
app.set('port', process.env.PORT ?? 8000)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Middlewares
app.use(morgan('dev'))
app.use(CookieParser())
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))

// Routes
app.use(HomeRoutes)
app.use('/auth', AuthRoutes)
app.use('/api/clients', ClientsRoutes)
app.use('/api/departments', DepartmentsRoutes)

export default app

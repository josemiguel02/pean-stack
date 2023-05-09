import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_PORT = Number(process.env.DB_PORT)

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 10,
    acquire: 30000,
    idle: 10000
  }
})

export default sequelize

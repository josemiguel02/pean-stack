import { DataTypes } from 'sequelize'
import sequelize from '../lib/db.js'

const Client = sequelize.define('clients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  'id_department': {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false })


export default Client

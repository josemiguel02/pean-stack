import { DataTypes } from 'sequelize'
import sequelize from '../lib/db.js'
import Client from './Client.js'

const Department = sequelize.define('departments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false })

Department.hasMany(Client, { foreignKey: 'id_department' })

export default Department

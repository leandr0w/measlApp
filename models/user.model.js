const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordChangedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('normal', 'admin'),
    allowNull: false,
    defaultValue: 'normal',
  },
  profileImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = User;

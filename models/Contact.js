const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Contact = sequelize.define('Contact', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true, // You can change this based on your requirements
    validate: {
      isEmail: true, // Use Sequelize validation to ensure it's a valid email
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // You can change this based on your requirements
  },
});

module.exports = Contact;

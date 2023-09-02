const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Customer = sequelize.define('Customer', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
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

module.exports = Customer;

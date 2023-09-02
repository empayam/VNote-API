const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Opportunity = sequelize.define('Opportunity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  closingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Opportunity;

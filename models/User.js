const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure usernames are unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true, // You can change this based on your role requirements
  },
});

// Hash the user's password before saving it to the database
User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

module.exports = User;

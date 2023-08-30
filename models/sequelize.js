// models/sequelize.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'your-database-host',
  port: 'your-database-port',
  username: 'your-database-username',
  password: 'your-database-password',
  database: 'your-database-name',
  define: {
    timestamps: false, // Disable sequelize's automatic timestamps
  },
});

module.exports = sequelize;

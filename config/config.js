// config.js
module.exports = {
  development: {
    database: {
      host: 'localhost',
      username: 'root',
      password: 'yourpassword',
      database: 'crm_dev',
    },
    jwtSecret: 'your-secret-key-for-jwt',
  },
  production: {
    database: {
      host: 'production-db-host',
      username: 'production-username',
      password: 'production-password',
      database: 'production-database',
    },
    jwtSecret: 'your-secret-key-for-jwt',
  },
};  
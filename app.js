// Import required packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./models'); // Assuming you have Sequelize models
const config = require('./config/config'); // Configuration file

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(morgan('combined')); // Log HTTP requests

// Database synchronization (assuming you're using Sequelize)
sequelize
  .sync() // This will create tables if they don't exist
  .then(() => {
    console.log('Database connected and synchronized.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Routes
const customerRoutes = require('./routes/customerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', customerRoutes);
app.use('/api', contactRoutes);
app.use('/api', opportunityRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the app for testing purposes

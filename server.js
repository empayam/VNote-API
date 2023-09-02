// Import required packages and modules
const http = require('http');
const app = require('./app'); // Assuming your main Express app is in app.js

// Define the port
const port = process.env.PORT || 3000;

// Create a HTTP server using the Express app
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

// Create a new customer
router.post('/customers', authenticateUser, createCustomer);

// Get a list of all customers
router.get('/customers', authenticateUser, getAllCustomers);

// Get a specific customer by ID
router.get('/customers/:customerId', authenticateUser, getCustomerById);

// Update a customer by ID
router.put('/customers/:customerId', authenticateUser, updateCustomer);

// Delete a customer by ID
router.delete('/customers/:customerId', authenticateUser, deleteCustomer);

module.exports = router;

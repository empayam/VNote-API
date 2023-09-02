const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  createContact,
  getAllContactsForCustomer,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

// Create a new contact for a specific customer
router.post('/:customerId/contacts', authenticateUser, createContact);

// Get all contacts for a specific customer
router.get('/:customerId/contacts', authenticateUser, getAllContactsForCustomer);

// Get a specific contact by ID
router.get('/:customerId/contacts/:contactId', authenticateUser, getContactById);

// Update a contact by ID
router.put('/:customerId/contacts/:contactId', authenticateUser, updateContact);

// Delete a contact by ID
router.delete('/:customerId/contacts/:contactId', authenticateUser, deleteContact);

module.exports = router;

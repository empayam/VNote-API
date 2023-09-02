const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  createOpportunity,
  getAllOpportunitiesForCustomer,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} = require('../controllers/opportunityController');

// Create a new opportunity for a specific customer
router.post('/:customerId/opportunities', authenticateUser, createOpportunity);

// Get all opportunities for a specific customer
router.get('/:customerId/opportunities', authenticateUser, getAllOpportunitiesForCustomer);

// Get a specific opportunity by ID
router.get('/:customerId/opportunities/:opportunityId', authenticateUser, getOpportunityById);

// Update an opportunity by ID
router.put('/:customerId/opportunities/:opportunityId', authenticateUser, updateOpportunity);

// Delete an opportunity by ID
router.delete('/:customerId/opportunities/:opportunityId', authenticateUser, deleteOpportunity);

module.exports = router;

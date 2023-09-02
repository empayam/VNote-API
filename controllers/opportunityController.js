const { Opportunity, Customer } = require('../models');

// Create a new opportunity for a specific customer
const createOpportunity = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { name, amount, closingDate } = req.body;

    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const opportunity = await Opportunity.create({
      name,
      amount,
      closingDate,
      customerId,
    });
    return res.status(201).json(opportunity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all opportunities for a specific customer
const getAllOpportunitiesForCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findByPk(customerId, {
      include: [Opportunity],
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const opportunities = customer.Opportunities;
    return res.json(opportunities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific opportunity by ID
const getOpportunityById = async (req, res) => {
  const { opportunityId } = req.params;

  try {
    const opportunity = await Opportunity.findByPk(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    return res.json(opportunity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an opportunity by ID
const updateOpportunity = async (req, res) => {
  const { opportunityId } = req.params;
  const { name, amount, closingDate } = req.body;

  try {
    const opportunity = await Opportunity.findByPk(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Update opportunity data
    opportunity.name = name;
    opportunity.amount = amount;
    opportunity.closingDate = closingDate;
    await opportunity.save();

    return res.json(opportunity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an opportunity by ID
const deleteOpportunity = async (req, res) => {
  const { opportunityId } = req.params;

  try {
    const opportunity = await Opportunity.findByPk(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    await opportunity.destroy();
    return res.json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createOpportunity,
  getAllOpportunitiesForCustomer,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};

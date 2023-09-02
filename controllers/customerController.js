const { Customer } = require('../models');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const customer = await Customer.create({ name, email, phone });

    return res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a list of all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    return res.json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific customer by ID
const getCustomerById = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { name, email, phone } = req.body;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Update customer data
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    await customer.save();

    return res.json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();
    return res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

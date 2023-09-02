const { Contact, Customer } = require('../models');

// Create a new contact for a specific customer
const createContact = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { name, email, phone } = req.body;

    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const contact = await Contact.create({ name, email, phone, customerId });
    return res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all contacts for a specific customer
const getAllContactsForCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findByPk(customerId, {
      include: [Contact],
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const contacts = customer.Contacts;
    return res.json(contacts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific contact by ID
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  try {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Update contact data
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    await contact.save();

    return res.json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.destroy();
    return res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createContact,
  getAllContactsForCustomer,
  getContactById,
  updateContact,
  deleteContact,
};

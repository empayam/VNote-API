const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { User } = require('../models');
const { authenticateUser } = require('../middleware/authMiddleware');

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user record
    const newUser = await User.create({ username, password: hashedPassword, role });

    // Generate a JWT token for the new user
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, config.jwtSecret);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret);

    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Example protected route (requires authentication)
router.get('/protected', authenticateUser, (req, res) => {
  return res.json({ message: 'This is a protected route' });
});

module.exports = router;

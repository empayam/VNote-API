// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { User } = require('../models');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    // Add more user-related data here if needed
  };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};

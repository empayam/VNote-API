const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models');

// Middleware to verify JWT token and authenticate users
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to restrict access to certain routes based on user roles or permissions
const authorizeUser = (requiredRoles) => {
  return (req, res, next) => {
    const { user } = req;

    if (!user || !user.role) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    if (!requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeUser,
};

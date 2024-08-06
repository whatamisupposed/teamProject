const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log('Token received:', token); // Log the token received

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Ensure decoded contains user information
    console.log('Decoded user:', req.user);
    next();
  } catch (err) {
    console.error('Token validation error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

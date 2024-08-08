const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Update the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Login route
router.post('/login', async (req, res) => {
  console.log('Login route hit');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user); // Check if user is found

    if (!user) {
      console.log('No user found with this email');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Check if password matches

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and send token
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User data retrieved:', user);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path to your User model

// Sign-up route
router.post('/', async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      courses: [], // Initialize with an empty array
      tuitionFees: 0,
      creditHours: 0,
      isAdmin: userType === 'admin'
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

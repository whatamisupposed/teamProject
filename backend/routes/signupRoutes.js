const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Sign-up route
router.post('/', async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    
    const newUser = new User({
      username,
      email,
      password,
      courses: [], 
      tuitionFees: 0,
      creditHours: 0,
      isAdmin: userType === 'admin'
    });

    
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

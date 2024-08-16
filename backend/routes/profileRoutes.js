const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

// GET /api/user/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('courses');
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({
      message: 'User profile retrieved successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        courses: user.courses,
        tuitionFees: user.tuitionFees,
        creditHours: user.creditHours
      }
    });
  } catch (err) {
    console.error('Profile retrieval error:', err);
    res.status(500).send('Server error');
  }
});

// PUT /api/user
router.put('/', auth, async (req, res) => {
  const { username, email } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ msg: 'User not authenticated' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({
      message: 'User profile updated successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        courses: user.courses,
        tuitionFees: user.tuitionFees,
        creditHours: user.creditHours
      }
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

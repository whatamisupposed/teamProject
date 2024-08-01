const express = require('express');
const auth = require('../middleware/auth');
const Student = require('../models/student');

const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user).populate('courses');
    if (!student) {
      return res.status(404).send('User not found');
    }
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  const { username, email } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      req.user,
      { username, email },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

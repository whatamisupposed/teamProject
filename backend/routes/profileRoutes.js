const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

// GET /api/user
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('courses'); // Ensure req.user.id is correct
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
// Use the auth middleware for protected routes
router.put('/', auth, async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id, // Ensure this is the correct field
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


// POST /api/user/enroll
router.post('/enroll', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const { courseId } = req.body;

    // Check if user is already enrolled in the course
    if (user.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add the course ID to the user's courses array
    user.courses.push(courseId);
    await user.save();

    res.json({ message: 'Enrolled successfully', courses: user.courses });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).send('Server error');
  }
});



module.exports = router;

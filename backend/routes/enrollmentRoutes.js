const express = require('express');
const auth = require('../middleware/auth'); // Ensure this is the correct path to your auth middleware
const User = require('../models/user'); // Ensure this is the correct path to your User model

const router = express.Router();

// POST /api/user/enroll
router.post('/enroll', auth, async (req, res) => {
  try {
      // Ensure user is authenticated
      if (!req.user || !req.user.id) {
          return res.status(401).json({ msg: 'Unauthorized' });
      }

      const userId = req.user.id;
      const { courseId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }

      // Check if user is already enrolled in the course
      if (user.courses.includes(courseId)) {
          return res.status(400).json({ msg: 'Already enrolled in this course' });
      }

      // Add courseId to user's courses
      user.courses.push(courseId);
      await user.save();

      res.status(200).json({ msg: 'Enrolled successfully', courses: user.courses });
  } catch (error) {
      console.error('Enrollment error:', error);
      res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/user/leave
// Remove course from user's courses
router.post('/leave', auth, async (req, res) => {
  console.log('Request body:', req.body); // Check if courseId is being received correctly
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ msg: 'Course ID is required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    console.log('Current courses:', user.courses); // Log current courses
    user.courses = user.courses.filter(course => course._id.toString() !== courseId);
    console.log('Updated courses:', user.courses); // Log updated courses

    await user.save();

    res.status(200).json({ msg: 'Course removed successfully', user });
  } catch (err) {
    console.error('Error removing course:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;

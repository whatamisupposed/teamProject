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


module.exports = router;

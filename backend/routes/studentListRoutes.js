const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const mongoose = require('mongoose');

router.get('/studentList', async (req, res) => {
  try {
    
    const users = await User.find({ isAdmin: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/courseList', async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
router.post('/removeCourse', async (req, res) => {
    const { courseId, userId } = req.body;

    if (!courseId || !userId) {
        return res.status(400).json({ msg: 'Course ID and User ID are required' });
    }

    // Validate courseId and userId format
    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: 'Invalid Course ID or User ID format' });
    }

    try {
        // Convert courseId to ObjectId
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { courses: new mongoose.Types.ObjectId(courseId) } },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ message: 'Course removed successfully' });
    } catch (err) {
        console.error('Error removing course:', err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = router;

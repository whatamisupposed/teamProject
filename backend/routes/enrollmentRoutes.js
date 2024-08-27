const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const Course = require('../models/course'); 

const router = express.Router();

router.post('/enroll', auth, async (req, res) => {
  console.log('Enroll route hit');
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const userId = req.user.id;
        const { courseId } = req.body;

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        console.log('Course price:', course.price); 

        
        if (user.courses.includes(courseId)) {
            return res.status(400).json({ msg: 'Already enrolled in this course' });
        }

        
        user.courses.push(courseId);
        console.log('Current tuition fees:', user.tuitionFees); 

        user.tuitionFees = (user.tuitionFees || 0) + course.price;

        console.log('Updated tuition fees:', user.tuitionFees); 

        await user.save();

        res.status(200).json({ msg: 'Enrolled successfully', courses: user.courses, tuitionFees: user.tuitionFees });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/leave', auth, async (req, res) => {
    console.log('Request body:', req.body); 
    const { courseId } = req.body;
  
    if (!courseId) {
      return res.status(400).json({ msg: 'Course ID is required' });
    }
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      console.log('Current courses:', user.courses); 

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
      }

     
      if (user.tuitionFees && user.tuitionFees >= course.price) {
        user.tuitionFees -= course.price;
      } else {
        user.tuitionFees = 0; 
      }

      user.courses = user.courses.filter(c => c._id.toString() !== courseId);
      console.log('Updated courses:', user.courses);
  
      await user.save();
  
      res.status(200).json({ msg: 'Course removed successfully', user });
    } catch (err) {
      console.error('Error removing course:', err);
      res.status(500).json({ msg: 'Server error' });
    }
});

  
  
  module.exports = router;

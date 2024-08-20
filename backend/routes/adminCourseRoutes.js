// adminCourseRoutes.js
const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Assuming you have a Course model set up

// Route to get all courses
router.get('/adminCourseRoutes', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetches all courses from the database
        res.json({ courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

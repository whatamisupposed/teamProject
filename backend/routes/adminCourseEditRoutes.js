const express = require('express');
const router = express.Router();
const Course = require('../models/course'); 
const auth = require('../middleware/auth');


router.put('/editCourse', auth, async (req, res) => {
    const { courseId, newName, newStartDate, newEndDate, newPrice, newSubjectArea } = req.body;

    console.log('Edit request received:', req.body);

    if (!courseId) {
        return res.status(400).json({ message: 'Course ID is required' });
    }

    try {
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.name = newName || course.name;
        course.startDate = newStartDate || course.startDate;
        course.endDate = newEndDate || course.endDate;
        course.price = newPrice || course.price;
        course.subjectArea = newSubjectArea || course.subjectArea;

        await course.save();

        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send('Server Error');
    }
});

router.post('/createCourse', auth, async (req, res) => {
    const { name, startDate, endDate, price, subjectArea, color } = req.body;

    try {
        const newCourse = new Course({
            name,
            startDate,
            endDate,
            price,
            subjectArea,
            color
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
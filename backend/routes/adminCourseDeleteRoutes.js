const express = require('express');
const router = express.Router();
const Course = require('../models/course'); 
const authMiddleware = require('../middleware/auth');

// Delete course route
router.delete('/deleteCourse', authMiddleware, async (req, res) => {
    try {
        const { courseId } = req.body;
        console.log('Deleting course with ID:', courseId); // Debugging

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        const result = await Course.findByIdAndDelete(courseId);
        console.log('Delete result:', result); // Debugging

        if (!result) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
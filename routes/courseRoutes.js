const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post('/courses', courseController.createCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.get('/courses', courseController.filterCourses);

module.exports = router;

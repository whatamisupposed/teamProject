//courseRoutes.js
const express = require('express');
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/courses', auth, courseController.createCourse);
router.delete('/courses/:id', auth, courseController.deleteCourse);
router.get('/courses', auth, courseController.filterCourses);

module.exports = router;

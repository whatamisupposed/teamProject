const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.post('/students', studentController.registerStudent);
router.delete('/students/:id', studentController.unregisterStudent);
router.get('/students', studentController.filterStudents);
router.post('/students/:studentId/courses/:courseId', studentController.registerForCourse);
router.delete('/students/:studentId/courses/:courseId', studentController.unregisterFromCourse);

module.exports = router;

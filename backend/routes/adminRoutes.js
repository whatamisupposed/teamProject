const express = require('express');
const Student = require('../models/student');
const Course = require('../models/course');
const auth = require('../middleware/auth');

const router = express.Router();

// Register a student for a course
router.post('/register', auth, async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).send('Student or Course not found');
    }

    if (course.students.includes(studentId)) {
      return res.status(400).send('Student already registered for this course');
    }

    if (course.students.length >= course.maxStudents) {
      return res.status(400).send('Course is full');
    }

    course.students.push(studentId);
    student.courses.push(courseId);

    await course.save();
    await student.save();

    res.send('Student registered for the course');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Unregister a student from a course
router.post('/unregister', auth, async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).send('Student or Course not found');
    }

    course.students.pull(studentId);
    student.courses.pull(courseId);

    await course.save();
    await student.save();

    res.send('Student unregistered from the course');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student'); // Adjust the path as needed

// Route to get student data by ID
router.get('/:id', async (req, res) => {
  const studentId = req.params.id;
  console.log('Received request for student ID:', studentId); // Debug statement

  try {
    const student = await Student.findById(studentId);
    console.log('Student data:', student); // Debug statement

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error('Error:', err); // Debug statement
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/students/current', async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming you have middleware to attach user info
    const student = await Student.findById(studentId);
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

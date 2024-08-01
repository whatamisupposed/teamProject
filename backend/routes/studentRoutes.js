const express = require('express');
const Student = require('../models/student');
const auth = require('../middleware/auth');

const router = express.Router();

// CRUD operations for students

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a new student
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send('Student deleted');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

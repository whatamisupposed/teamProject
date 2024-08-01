const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const config = require('../config/config');

const router = express.Router();

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Student.findOne({ username });

    if (!student) {
        return res.status(400).send("User not found");
      }
  
      const isMatch = await bcrypt.compare(password, student.password);
  
      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }
  
      const token = jwt.sign({ id: student._id }, config.jwtSecret);
  
      res.status(200).send({ token });
    } catch (err) {
      res.status(500).send("Server error");
    }
  });
  
  // User registration
  router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      let student = await Student.findOne({ username });
  
      if (student) {
        return res.status(400).send("User already exists");
      }
  
      student = new Student({
        username,
        password: await bcrypt.hash(password, 10),
        email
      });
  
      await student.save();
  
      const token = jwt.sign({ id: student._id }, config.jwtSecret);
  
      res.status(201).send({ token });
    } catch (err) {
      res.status(500).send("Server error");
    }
  });
  
  module.exports = router;
  
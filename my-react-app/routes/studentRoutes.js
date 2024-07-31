const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth'); // Middleware to verify token

router.post('/register', studentController.register);
router.post('/login', studentController.login);
router.get('/profile', auth, studentController.getProfile);
router.get('/', auth, studentController.getAllStudents);

module.exports = router;

const mongoose = require('../config/mongoose'); // This ensures the database connection is established
const Student = require('./student');
const Course = require('./course');
const Registration = require('./registration');

// Ensure the references are populated
StudentSchema.virtual('courses', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'student',
});

CourseSchema.virtual('students', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'course',
});

module.exports = {
  mongoose,
  Student,
  Course,
  Registration,
};

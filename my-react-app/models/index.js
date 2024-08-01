const mongoose = require('../config/mongoose'); // Ensure the database connection is established
const Student = require('./student'); // Import the Student model
const Course = require('./course'); // Import the Course model
const Registration = require('./registration'); // Import the Registration model

// Define Student schema and virtuals
const StudentSchema = Student.schema;
StudentSchema.virtual('courses', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'student',
});

// Define Course schema and virtuals
const CourseSchema = Course.schema;
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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const courseSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  subjectArea: {
    type: String,
    enum: [
      'Art & Design',
      'Theology',
      'Business',
      'Computer Science',
      'Data Science',
      'Education & Teaching',
      'Health & Medicine',
      'Humanities',
      'Mathematics',
      'Programming',
      'Science',
      'Social Sciences'
    ],
    required: true
  },
  // Additional fields can be added here
});

// Create the model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

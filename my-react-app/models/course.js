module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course_name: { type: DataTypes.STRING, allowNull: false },
    course_description: { type: DataTypes.STRING },
  });
  return Course;
};
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  description: { type: String, required: true },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
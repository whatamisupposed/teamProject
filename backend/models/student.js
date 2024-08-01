const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  tuitionFees: { type: Number, default: 0 },
  creditHours: { type: Number, default: 0 },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;

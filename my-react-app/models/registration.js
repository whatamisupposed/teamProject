const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  registeredAt: { type: Date, default: Date.now },
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;

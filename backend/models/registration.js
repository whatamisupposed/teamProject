const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;

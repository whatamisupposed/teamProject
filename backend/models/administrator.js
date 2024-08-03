const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministratorSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
  // Add other fields as needed
});

module.exports = mongoose.model('Administrator', AdministratorSchema);

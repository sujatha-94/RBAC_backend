const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: { type: String, unique: true, required: true },
  permissions: [String], // List of actions
});

module.exports = mongoose.model('Role', roleSchema);

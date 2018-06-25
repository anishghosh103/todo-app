const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  verified: Boolean
});

module.exports = mongoose.model('User', UserSchema);
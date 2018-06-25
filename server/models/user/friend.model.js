const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  users: [String],
  status: {
    type: String,
    enum: ['request-pending', 'friend']
  }
});

module.exports = mongoose.model('Friend', FriendSchema);
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  type: String,
  userId: String,
  createdAt: Date,
  data: {}
});

module.exports = mongoose.model('Notification', NotificationSchema);
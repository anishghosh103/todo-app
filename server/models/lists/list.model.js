const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  listId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  creatorId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  tasks: [{
    taskId: String,
    description: String,
    done: Boolean,
    parentTask: String,
    createdAt: Date
  }],
  state: Number,
  createdAt: Date,
  private: Boolean,
});

module.exports = mongoose.model('List', ListSchema);
const mongoose = require('mongoose');

const ListUpdateSchema = new mongoose.Schema({
  listId: String,
  updatedState: Number,
  type: String,
  data: {}
});

module.exports = mongoose.model('ListUpdate', ListUpdateSchema);
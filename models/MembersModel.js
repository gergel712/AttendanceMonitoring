const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  Name: {
    required: true,
    type: String
  },
  joinedDate: {
    required: true,
    type: Date
  },
  Status: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('Members', memberSchema);

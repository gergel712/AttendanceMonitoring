const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Events' },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Members' },
  timeIn: {
    required: true,
    type: Date
  },
  timeOut: {
    required: true,
    type: Date
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);

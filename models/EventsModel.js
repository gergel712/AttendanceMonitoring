const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    required: true,
    type: String
  },
  eventType: {
    required: true,
    type: String
  },
  startDate: {
    required: true,
    type: Date
  },
  endDate: {
    required: true,
    type: Date
  },

  MemberAttendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
});

module.exports = mongoose.model('Events', eventSchema);

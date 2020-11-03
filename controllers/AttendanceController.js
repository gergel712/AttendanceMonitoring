const AttendanceModel = require('../models/AttendanceModel');
const EventsModel = require('../models/EventsModel');

//Insert Attendance
exports.insertAttendance = async function (req, res, next) {
    try {
        const {memberId, eventId, timeIn, timeOut} = req.body;
        const eventDoc = await EventsModel.findById(eventId);

        const attendanceLogDoc = new AttendanceModel({
            member: memberId,
            event: eventId,
            timeIn,
            timeOut
        });

        eventDoc.MemberAttendance.push(attendanceLogDoc._id);
        await attendanceLogDoc.save();
        eventDoc.save();
  
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  };
//Delete Attendance
  exports.deleteAttendance = async function (req, res, next) {
    try {
      const id = req.params.id;
      await AttendanceModel.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };
  
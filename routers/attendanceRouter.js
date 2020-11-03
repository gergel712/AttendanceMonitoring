const express = require('express');
const attendanceController = require('../controllers/AttendanceController');
const {validateAttendance} = require('../validator/attendanceValidator');

const router = express.Router();
router.post('/', validateAttendance,attendanceController.insertAttendance);
router.delete('/:id', attendanceController.deleteAttendance);
module.exports = router;

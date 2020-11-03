const {check, validationResult} = require('express-validator');

exports.validateAttendance = [
    check('timeIn')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('TimeIn can not be empty!')
    .custom((value, { req }) => value < req.body.timeOut)
    .withMessage('timeIn cannot be greater than timeOut!')
    .bail(),
  check('timeOut')
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage('TimeOut Type can not be empty!')
  .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];
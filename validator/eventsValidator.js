const {check, validationResult} = require('express-validator');

exports.validateEvents = [
    check('eventName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Event Name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
    check('eventType')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Event Type can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
    check('startDate')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Event Type can not be empty!')
    .custom((value, { req }) => value < req.body.endDate)
    .withMessage('StartDate cannot be greater than End Date!')
    .bail(),
    check('endDate')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Event Type can not be empty!')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];
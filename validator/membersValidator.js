const {check, validationResult} = require('express-validator');

exports.validateMember = [
    check('Name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('joinedDate')
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage('Event Type can not be empty!')
  .bail(),
  check('Status')
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
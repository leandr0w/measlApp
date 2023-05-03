const { body, validationResult } = require('express-validator');

validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];
exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  validFields,
];
exports.createRestaurant = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage('You rating 1 to 5'),
  validFields,
];
exports.createReview = [
  body('comment').notEmpty().withMessage('Comment cannot be empty'),
  body('rating')
    .notEmpty()
    .isInt({ min: 1, max: 10 })
    .withMessage('You rating 1 to 10'),
  validFields,
];
exports.createMeal = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().isInt().withMessage('Price cannot be empty'),
  validFields,
];
exports.createOrder = [
  body('quantity').notEmpty().isInt().withMessage('Quantity cannot be empty'),
  body('mealId').notEmpty().isInt().withMessage('Price cannot be empty'),
  validFields,
];

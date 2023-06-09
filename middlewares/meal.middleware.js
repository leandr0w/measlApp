const Meal = require('../models/meal.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistMeals = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  if (!meal) {
    return next(new AppError('The meal not found'), 404);
  }
  req.meal = meal;
  next();
});

exports.validMealActive = catchAsync(async (req, res, next) => {
  const meal = await Meal.findOne({
    where: {
      status: 'active',
    },
  });
  if (!meal) {
    return next(new AppError('The meal not found'), 404);
  }
  req.meal = meal;
  next();
});

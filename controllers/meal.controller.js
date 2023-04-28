const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.findMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurantId } = req.params;

  const meals = await Meal.create({
    name,
    price,
    restaurantId,
  });
  res.status(201).json({
    status: 'success',
    message: 'The meal has been created',
    meals,
  });
});

exports.updateMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been updated',
    meal,
  });
});

exports.deleteMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been removed',
  });
});

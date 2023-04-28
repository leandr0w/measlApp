const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');

exports.validIfRestaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!restaurant) {
    return next(new AppError('The restaurant not found', 404));
  }
  res.status(200).json({
    status: 'success',
    restaurant,
  });

  req.restaurant = restaurant;

  next();
});

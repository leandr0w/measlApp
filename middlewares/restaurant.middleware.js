const Restaurant = require('../models/restaurant.model');
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
    return res.status(404).json({
      status: 'error',
      message: `The restaurant with id: ${id} not found`,
    });
  }
  res.status(200).json({
    status: 'success',
    restaurant,
  });

  req.restaurant = restaurant;

  next();
});

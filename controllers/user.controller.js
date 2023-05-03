const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;

  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The data has been updated',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});
exports.getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        include: [{ model: Restaurant }],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    user: sessionUser.id,
    orders,
  });
});

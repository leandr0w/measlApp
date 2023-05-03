const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { sessionUser, meal } = req;

  const finalPrice = meal.price * quantity;

  const order = await Order.create({
    mealId,
    quantity,
    totalPrice: finalPrice,
    userId: sessionUser.id,
  });
  res.status(201).json({
    status: 'success',
    message: 'The order is incoming',
    order,
  });
});
exports.getOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'You order',
    results: order.length,
    order,
  });
});
exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'The order is finished',
    order,
  });
});
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'The order is cancelled',
    order,
  });
});

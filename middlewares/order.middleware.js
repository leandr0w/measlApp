const Order = require('../models/order.model');
const User = require('../models/user.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');

exports.validifExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!order) {
    return next(new AppError('The order not found'), 404);
  }
  req.order = order;
  next();
});

exports.userOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const user = await User.findOne({
    where: {
      id: order.userId,
      status: 'active',
    },
  });
  if (!user) {
    return next(new AppError('The user not found', 404));
  }
  req.user = user;
  next();
});

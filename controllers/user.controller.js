const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const { ref, getDownloadURL } = require('firebase/storage');
const { storage } = require('./../utils/firebase');

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

exports.findAll = catchAsync(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password', 'passwordChangedAt', 'status'] },
    where: {
      status: 'active',
    },
  });

  const userPromises = users.map(async (user) => {
    const imgRef = ref(storage, user.profileImgUrl);

    const url = await getDownloadURL(imgRef);

    user.profileImgUrl = url;

    return user;
  });

  const userResolved = await Promise.all(userPromises);

  res.status(200).json({
    status: 'success',
    results: users.length,
    users: userResolved,
  });
});

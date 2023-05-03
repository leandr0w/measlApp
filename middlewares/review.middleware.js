const Review = require('../models/review.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');

exports.validIfReviewExist = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
      restaurantId: restaurantId,
    },
  });
  if (!review) {
    return next(new AppError('The review not found', 404));
  }

  req.review = review;

  next();
});
exports.userReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const user = await User.findOne({
    where: {
      id: review.userId,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('The user not found', 404));
  }

  req.user = user;

  next();
});

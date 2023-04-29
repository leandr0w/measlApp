const Review = require('../models/review.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');

exports.validIfReviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!review) {
    return next(new AppError('The review not found', 404));
  }
  res.status(200).json({
    status: 'success',
    review,
  });

  req.review = review;

  next();
});

const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const { sessionUser } = req;

  const review = await Review.create({
    comment,
    rating,
    restaurantId: id,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Review created',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been changed',
    review,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'Review removed',
  });
});

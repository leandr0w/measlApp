const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurantId } = req.params;
  const { sessionUser } = req;

  const review = await Review.create({
    comment,
    rating,
    restaurantId,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Review created',
    review,
  });
});

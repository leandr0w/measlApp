const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('../controllers/review.controller');

const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const reviewMiddlewarE = require('../middlewares/review.middleware');

router.get('/', restaurantController.findAllRestaurant);

router.get('/:id', restaurantMiddleware.validIfRestaurantExist);

router.use(authMiddleware.protect);

router.post(
  '/',
  validationMiddleware.createRestaurant,
  authMiddleware.restrictTo('admin'),
  restaurantController.createRestaurant
);

router.patch(
  '/:id',
  restaurantMiddleware.validIfRestaurantExist,
  authMiddleware.restrictTo('admin'),
  restaurantController.updateRestaurant
);
router.delete(
  '/:id',
  restaurantMiddleware.validIfRestaurantExist,
  authMiddleware.restrictTo('admin'),
  restaurantController.deleteRestaurant
);

router.post(
  '/review/:id',
  validationMiddleware.createReview,
  reviewController.createReview
);
router.patch(
  '/review/:restaurantId/:id',
  reviewMiddlewarE.validIfReviewExist,
  reviewMiddlewarE.userReview,
  authMiddleware.protectAccountOwner,
  validationMiddleware.createReview,
  reviewController.updateReview
);
router.delete(
  '/review/:restaurantId/:id',
  reviewMiddlewarE.validIfReviewExist,
  reviewMiddlewarE.userReview,
  authMiddleware.protectAccountOwner,
  reviewController.deleteReview
);

module.exports = router;

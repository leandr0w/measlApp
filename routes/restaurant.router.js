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
  '/review/:restaurantId',
  validationMiddleware.createReview,
  reviewController.createReview
);
router.patch(
  '/review/:restaurantId/:id',
  restaurantMiddleware.validIfRestaurantExist,
  reviewMiddlewarE.validIfReviewExist,
  validationMiddleware.createReview,
  authMiddleware.protectAccountOwner,
  reviewController.updateReview
);

module.exports = router;

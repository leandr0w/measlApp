const express = require('express');
const router = express.Router();

const mealController = require('../controllers/meal.controller');

const mealMiddleware = require('../middlewares/meal.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

router.get('/', mealController.findMeals);

router.get(
  '/:id',
  mealMiddleware.validIfExistMeals,
  mealController.findOneMeal
);

router.use(authMiddleware.protect);

router.post(
  '/:restaurantId',
  validationMiddleware.createMeal,
  authMiddleware.restrictTo('admin'),
  mealController.createMeals
);

router.patch(
  '/:id',
  mealMiddleware.validIfExistMeals,
  authMiddleware.restrictTo('admin'),
  mealController.updateMeals
);
router.delete(
  '/:id',
  mealMiddleware.validIfExistMeals,
  authMiddleware.restrictTo('admin'),
  mealController.deleteMeals
);

module.exports = router;

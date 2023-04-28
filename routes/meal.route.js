const express = require('express');
const router = express.Router();

const mealController = require('../controllers/meal.controller');

const mealMiddleware = require('../middlewares/meal.middleware');

router.post('/:restaurantId', mealController.createMeals);

router.get('/', mealController.findMeals);

router.get(
  '/:id',
  mealMiddleware.validIfExistMeals,
  mealController.findOneMeal
);

router.patch(
  '/:id',
  mealMiddleware.validIfExistMeals,
  mealController.updateMeals
);
router.delete(
  '/:id',
  mealMiddleware.validIfExistMeals,
  mealController.deleteMeals
);

module.exports = router;

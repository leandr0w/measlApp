const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant.controller');

const restaurantMiddleware = require('../middlewares/restaurant.middleware');

router.post('/', restaurantController.createRestaurant);

router.get('/', restaurantController.findAllRestaurant);

router.get('/:id', restaurantMiddleware.validIfRestaurantExist);

router.patch(
  '/:id',
  restaurantMiddleware.validIfRestaurantExist,
  restaurantController.updateRestaurant
);
router.delete(
  '/:id',
  restaurantMiddleware.validIfRestaurantExist,
  restaurantController.deleteRestaurant
);

module.exports = router;

const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const mealMiddleware = require('../middlewares/meal.middleware');
const orderMiddleware = require('../middlewares/order.middleware');

router.use(authMiddleware.protect);

router.post(
  '/',
  mealMiddleware.validMealActive,
  validationMiddleware.createOrder,
  orderController.createOrder
);

router.get('/me', orderController.getOrder);

router.patch(
  '/:id',
  orderMiddleware.validifExistOrder,
  orderMiddleware.userOrder,
  authMiddleware.protectAccountOwner,
  orderController.updateOrder
);
router.delete(
  '/:id',
  orderMiddleware.validifExistOrder,
  orderMiddleware.userOrder,
  authMiddleware.protectAccountOwner,
  orderController.deleteOrder
);

module.exports = router;

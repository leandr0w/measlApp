const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post(
  '/login',

  authController.login
);

router.use(authMiddleware.protect);

router.patch(
  '/:id',
  userMiddleware.validExistUser,
  validationMiddleware.updateUserValidation,
  authMiddleware.protectAccountOwner,
  userController.updateUser
);
router.delete(
  '/:id',
  userMiddleware.validExistUser,
  authMiddleware.protectAccountOwner,
  userController.deleteUser
);

module.exports = router;

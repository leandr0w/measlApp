const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.patch('/:id', userController.updateUser);

module.exports = router;

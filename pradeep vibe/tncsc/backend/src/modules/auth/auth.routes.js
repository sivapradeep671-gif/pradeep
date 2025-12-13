const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.post('/login', authController.login);
router.get('/me', authController.getCurrentUser); // Protected (TODO: Add Auth Middleware)

module.exports = router;

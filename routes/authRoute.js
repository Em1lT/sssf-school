'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const pass = require('../utils/pass');

router.post('/login',  authController.login);

module.exports = router;
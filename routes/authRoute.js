'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const pass = require('../utils/pass');

router.post('/login',  authController.login);

router.post('/register',  authController.register);

router.get('/test',  (req,res) => res.json("moi"));

module.exports = router;
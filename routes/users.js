const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const mongoose = require('mongoose');
const userController = require('../controllers/userC');

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/signup', userController.getSignUp);

router.post('/signup', userController.postSignUp);
module.exports = router;
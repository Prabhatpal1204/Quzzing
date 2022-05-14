const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const mongoose = require('mongoose');

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    // console.log(req.body);
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });
    user
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'User Created'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
module.exports = router;
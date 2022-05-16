const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.getSignUp = (req, res, next) => {
    res.render('signup');
};

exports.postSignUp = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            Username: req.body.Username,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).redirect('/');
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500);
                            });
                    }
                });
            }
        });
};

exports.postLogin = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            console.log(user.length);
            if (user.length < 1) {
                console.log('From length');
                return res.status(404).json({ message: 'invalid email' });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        console.log('From compare');
                        console.log(err);
                        return res.status(401);
                    }
                    if (result) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return res.status(200).redirect('/');
                    } else {
                        res.status(401).json({ message: 'Incorrect Password' });
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};
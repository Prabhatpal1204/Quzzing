const express = require('express');
const router = express.Router();

//get all users
router.get('/login', (req, res, next) => {
    res.render('login');
});

module.exports = router;